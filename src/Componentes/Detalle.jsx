import { OPCIONES } from '../servicios/constantes'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { buscarDetalle, buscarStaff } from '../servicios/buscarDetalle'
import noVideo from '../assets/no-video.png'
export function Detalle() {
    const [peli, setPeli] = useState({})
    const { id } = useParams()

    const array = id.split('-')
    const tipo = array[0]
    const queBuscar = array[1]
    const navegar = useNavigate()
    const {
        title,
        year,
        rating,
        runtime,
        genre,
        directores,
        reparto,
        productores,
        image,
        poster,
        overview,
        video
    } = peli
    console.log(video)
    const handleClick = () => {
        document.getElementById('detalle').classList.remove('visible')
        document.getElementById('abajo').classList.remove('visible')
        setTimeout(() => {
            navegar(-1)
        }, 200)
    }
    useEffect(() => {
        pedir(queBuscar, tipo)
    }, [])

    const pedir = async (queBuscar, tipo) => {
        let npeli = await buscarDetalle(queBuscar, tipo)

        setTimeout(async () => {
            let apeli = await buscarStaff(queBuscar, tipo)
            setPeli({ ...npeli, ...apeli })
        }, 30)

        document.getElementById('detalle').classList.add('visible')
    }
    const aunNoCargo = Object.keys(peli).length === 0
    const detalle = document.getElementById('detalle')

    const mostrarPlayer = () => {
        document.getElementById('player').classList.add('visible')
        document.getElementById('abajo').classList.add('visible')
        detalle.removeEventListener('transitionend', mostrarPlayer)
    }

    if (detalle) detalle.addEventListener('transitionend', mostrarPlayer)
    return (
        <div
            id='detalle'
            className='detalle'
            onClick={handleClick}
            style={{ backgroundImage: `url(${image})` }}
        >
            {aunNoCargo ? (
                <div className='spinner' />
            ) : (
                <div className='container'>
                    <h1> {title}</h1>
                    <div id='player' className='player'>
                        {video ? (
                            <iframe
                                src={video + OPCIONES}
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img className='novideo' src={noVideo} alt={title} />
                        )}
                    </div>
                    <div id='abajo' className='abajo'>
                        <div className='imagen'>
                            <img src={poster} />
                        </div>
                        <div className='texto'>
                            <p>Estreno: {year}</p>
                            <p>Popularidad: {rating}</p>
                            <p>Duración: {runtime} min.</p>
                            <p>Géneros: {genre}</p>
                            <p>Actor/es: {reparto}</p>
                            <p>Director/es: {directores}</p>
                            <p>Productor/es: {productores}</p>
                            <p>Argumento: {overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
