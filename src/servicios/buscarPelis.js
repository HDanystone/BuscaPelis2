import {
    URLBASE,
    APIKEY,
    BUSQUEDA,
    CONSULTA,
    ERROR_PETICION,
    LENG,
    IMAGENES_URL_BASE,
    TAMAÑO_P
} from './constantes'

export const buscar = async (queBuscar, tipo) => {
    if (queBuscar === '') return null

    const url = `${URLBASE + BUSQUEDA + tipo + CONSULTA + queBuscar}&${LENG + APIKEY}`

    try {
        const respuesta = await fetch(url)
        const json = await respuesta.json()
        const arrayPelisApi = json.results
        const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
        const fechaEstreno = tipo === 'tv' ? 'first_air_date' : 'release_date'
        console.log(arrayPelisApi[0])
        return arrayPelisApi?.map((peli) => ({
            id: peli.id,
            runtime: peli.runtime,
            title: peli[nombreOtitulo].slice(0, 35),
            genre: peli.genres.map((genre) => genre.name + ', ').join(''),
            year: peli[fechaEstreno].split('-').reverse().join('/'),
            image: IMAGENES_URL_BASE + TAMAÑO_P + peli.poster_path
        }))
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}
export const buscarPrevia = async (queBuscar, tipo) => {
    if (queBuscar === '') return null

    const url = `${URLBASE + BUSQUEDA + tipo + CONSULTA + queBuscar}&${LENG + APIKEY}`

    try {
        const respuesta = await fetch(url)
        const json = await respuesta.json()
        const arrayPelisApi = json.results
        const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
        return arrayPelisApi?.map((peli) => ({
            title: peli[nombreOtitulo]
        }))
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}
