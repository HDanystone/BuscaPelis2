import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PROXIMO, AIRE, PELI } from '../servicios/constantes'
import { pedirListas } from '../servicios/pedirListas'

export function Banner({ tipo }) {
    const navegar = useNavigate()
    const [pelis, setPelis] = useState([])
    const banner = useRef(null)
    const intervalo = useRef(null)
    const adelante = '>'
    const atras = '<'
    const lista = tipo === PELI ? PROXIMO : AIRE
    useEffect(() => {
        pedirLista()
        if (!intervalo.current)
            intervalo.current = setInterval(() => {
                handleProx()
            }, 6000)
        return () => {
            clearInterval(intervalo.current)
        }
    }, [tipo])
    const handleClick = (id) => {
        detenerSlider()
        navegar(`/detalle/${tipo}-${id}`)
    }
    const pedirLista = async () => {
        let npelis = await pedirListas(lista, tipo)
        let spelis = npelis.slice(0, 5)
        setPelis(spelis)
    }

    const handlePrev = () => {
        if (banner.current.children.length > 0) {
            const primerSlide = banner.current.children[0]
            let index = banner.current.children.length - 1
            const ultimoSlide = banner.current.children[index]
            banner.current.insertBefore(ultimoSlide, primerSlide)
            const ancho = primerSlide.offsetWidth
            banner.current.style.transition = `none`
            banner.current.style.transform = `translateX(-${ancho}px)`
            setTimeout(() => {
                banner.current.style.transition = `all 500ms ease-out`
                banner.current.style.transform = `translateX(0px)`
            }, 20)
        }
    }
    const handleProx = () => {
        if (banner.current.children.length > 0) {
            const primerSlide = banner.current.children[0]
            const ancho = primerSlide.offsetWidth
            banner.current.style.transition = `all 500ms ease-out`
            banner.current.style.transform = `translateX(-${ancho}px)`

            const prepararBanner = () => {
                banner.current.style.transition = `none`
                banner.current.style.transform = `translateX(0)`
                banner.current.appendChild(primerSlide)
                banner.current.removeEventListener('transitionend', prepararBanner)
            }
            banner.current.addEventListener('transitionend', prepararBanner)
        }
    }
    const detenerSlider = () => {
        clearInterval(intervalo.current)
    }
    const reanudarSlider = () => {
        intervalo.current = setInterval(() => {
            handleProx()
        }, 6000)
    }
    return (
        <div className='banner'>
            <div ref={banner} className='banner-in'>
                {pelis?.map((peli, index) => {
                    return (
                        <img
                            key={index}
                            className='itmbanner'
                            src={peli.banner}
                            onClick={() => handleClick(peli.id)}
                        ></img>
                    )
                })}
            </div>
            <button
                className='boton atras'
                onMouseEnter={detenerSlider}
                onMouseLeave={reanudarSlider}
                onClick={handlePrev}
            >
                {atras}
            </button>
            <button
                className='boton adelante'
                onMouseEnter={detenerSlider}
                onMouseLeave={reanudarSlider}
                onClick={handleProx}
            >
                {adelante}
            </button>
        </div>
    )
}
