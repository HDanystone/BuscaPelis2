import { useState, useEffect } from 'react'
import { Listas } from './Listas'
import { pedirListas } from '../servicios/pedirListas'

export function Paginado({ lista, tipo }) {
    const [indice, setIndice] = useState(0)
    const [pelis, setPelis] = useState([])
    const adelante = '>'
    const atras = '<'

    useEffect(() => {
        pedir(lista)
    }, [tipo])

    const pedir = async (lista) => {
        let nPelis = await pedirListas(lista, tipo)
        setPelis(nPelis)
    }

    const handlePrev = () => {
        atenuarPelis()
        let nIndice = indice - 4 < 0 ? pelis.length - 4 : indice - 4
        setTimeout(() => {
            setIndice(nIndice)
        }, 200)
    }
    const handleProx = () => {
        atenuarPelis()
        let nIndice = indice + 4 >= pelis.length ? 0 : indice + 4
        setTimeout(() => {
            setIndice(nIndice)
        }, 200)
    }
    const atenuarPelis = () => {
        const pelisCards = document.getElementById(lista).children
        Array.from(pelisCards).forEach((peli) => {
            peli.children[0].classList.remove('visible')
        })
    }
    const aMostrar = pelis?.slice(indice, indice + 4)

    return (
        <div id='paginado' className='paginado'>
            <Listas aMostrar={aMostrar} tipo={tipo} lista={lista} />
            <div name='atras' className='boton atras' onClick={() => handlePrev()}>
                {atras}
            </div>
            <div name='adelante' className='boton adelante' onClick={() => handleProx()}>
                {adelante}
            </div>
        </div>
    )
}
