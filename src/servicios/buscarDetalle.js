import {
    URLBASE,
    APIKEY,
    LENGUAJE,
    IMAGENES_URL_BASE,
    ERROR_PETICION,
    PELI,
    SERIE,
    AGREGAR_VIDEOS,
    TAMAÑO_G,
    TAMAÑO_P,
    URL_YOUTUBE,
    AGREGAR_STAFF
} from './constantes'

export const buscarDetalle = async (queBuscar, tipo) => {
    if (queBuscar === '') return null

    const url = `${URLBASE + tipo}/${queBuscar}?${LENGUAJE + APIKEY + AGREGAR_VIDEOS}`
    const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
    const fechaEstreno = tipo === 'tv' ? 'first_air_date' : 'release_date'
    try {
        const respuesta = await fetch(url)
        const peli = await respuesta.json()
        return {
            title: peli[nombreOtitulo],
            year: peli[fechaEstreno].split('-').reverse().join('/'),
            overview: peli.overview,
            genre: peli.genres.map((genre) => genre.name).join(',  '),
            rating: peli.vote_average,
            poster: IMAGENES_URL_BASE + TAMAÑO_P + peli.poster_path,
            image: IMAGENES_URL_BASE + TAMAÑO_P + peli.backdrop_path,
            video: peli.videos.results.length > 0 ? URL_YOUTUBE + peli.videos.results[0].key : null,
            runtime: peli.runtime
        }
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}

export const buscarStaff = async (queBuscar, tipo) => {
    const url = `${URLBASE + tipo}/${queBuscar}?${LENGUAJE + APIKEY + AGREGAR_STAFF}`
    const nombreOtitulo = tipo === 'tv' ? 'name' : 'title'
    const fechaEstreno = tipo === 'tv' ? 'first_air_date' : 'release_date'
    try {
        const respuesta = await fetch(url)
        let peli = await respuesta.json()
        let reparto = peli.credits.cast
        let actores = reparto.filter((item) =>
            Object.keys(item).some((key) => item[key] === 'Acting')
        )
        let equipo = peli.credits.crew
        let directores = equipo.filter((item) => item.job === 'Director')
        let productores = equipo.filter((item) => item.job.includes('Producer'))
        productores = productores.slice(0, 4)
        actores = actores.slice(0, 15)
        return {
            reparto: actores.map((p) => p.name).join(',  '),
            directores: directores.map((p) => p.name).join(',  '),
            productores: productores.map((p) => p.name).join(',  ')
        }
    } catch (error) {
        throw new Error(ERROR_PETICION)
    }
}
