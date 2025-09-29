import {
    URLBASE,
    APIKEY,
    COMUN2,
    IMAGENES_URL_BASE,
    ERROR_PETICION,
    TAMAÑO_P,
    TAMAÑO_G,
    PROXIMO,
    COMUN,
    CONSULTA,
    LENGUAJE
} from './constantes'
export const pedirListas = async (lista, tipo) => {
    const url = URLBASE + CONSULTA + tipo + COMUN + lista + COMUN2 + APIKEY

    try {
        const respuesta = await fetch(url)
        const json = await respuesta.json()
        const arrayPelisApi = json.results
        const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
        const fechaEstreno = tipo === 'tv' ? 'first_air_date' : 'release_date'

        return arrayPelisApi?.map((peli) => ({
            rating: peli.vote_average,
            id: peli.id,
            runtime: peli.runtime,
            title: peli[nombreOtitulo].slice(0, 35),
            year: peli[fechaEstreno].split('-').reverse().join('/'),
            banner: IMAGENES_URL_BASE + TAMAÑO_G + peli.backdrop_path,
            image: IMAGENES_URL_BASE + TAMAÑO_P + peli.poster_path
        }))
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}

export const pedirEstrenos = async (tipo) => {
    const url = URLBASE + tipo + PROXIMO + LENGUAJE + APIKEY
    console.log(url)
    const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
    try {
        const respuesta = await fetch(url)
        const json = await respuesta.json()
        const arrayPelisApi = json.results
        const arrayPelis = arrayPelisApi.slice(0, 5)
        const fechaEstreno = tipo === 'tv' ? 'first_air_date' : 'release_date'
        console.log(arrayPelis[4].backdrop_path)
        return arrayPelis?.map((peli) => ({
            id: peli.id,
            year: peli[fechaEstreno].split('-').reverse().join('/'),
            image:
                peli.backdrop_path === null
                    ? null
                    : IMAGENES_URL_BASE + TAMAÑO_G + peli.backdrop_path,
            rating: peli.vote_average,
            title: peli[nombreOtitulo]
        }))
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}
