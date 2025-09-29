import { useState } from 'react'
import { PELI, SERIE } from '../servicios/constantes'
export function BarraBuscar() {
    const [queBuscar, setQueBuscar] = useState('')

    const chkbox = document.getElementById('cambiar')
    const handleChange = () => {}
    const handleSubmit = (e) => {
        e.preventDefault()
        let tipo = chkbox.checked ? SERIE : PELI
        //        aBuscar(queBuscar, tipo)
        setQueBuscar('')
    }

    return (
        <div className='barraBuscar'>
            <form className='buscar' onSubmit={handleSubmit}>
                <input
                    type='search'
                    className='search'
                    id='search'
                    name='titulo'
                    onChange={handleChange}
                    value={queBuscar}
                    placeholder='Título de la peli o serie...'
                />
                <button type='submit' className='submit'>
                    {' '}
                    Buscar{' '}
                </button>
            </form>

            <div className='contenedorResultados' id='resultado'></div>
        </div>
    )
}
/*             <Peliculas
                    peliculasAMostrar={listaPeliculas}
                    buscando={buscando}
                    pedirDetalle={pedirDetalle}/>
                    */
