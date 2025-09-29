import { useNavigate } from 'react-router-dom'
import noImage from '../assets/missing-picture.png'
export function Pelicula({ peli, tipo }) {
    const { title, year, id, image, rating, genre, runtime } = peli
    const navegar = useNavigate()

    const handleClick = (id) => {
        navegar(`/detalle/${tipo}-${id}`)
    }
    const hacerVisible = () => {
        event.target.classList.add('visible')
    }
    return (
        <div id='peli' className='pelicula' onClick={() => handleClick(id)}>
            {image.includes('null') ? (
                <img className='imgpeli' src={noImage} alt={title} onLoad={hacerVisible} />
            ) : (
                <img className='imgpeli' src={image} alt={title} onLoad={hacerVisible} />
            )}

            <div className='info'>
                <label className='lbl'>{title}</label>
                <label className='titulo'>Géneros: {genre}</label>
                <label className='titulo'>Duración: {runtime}</label>
                <label className='año'>Estreno: {year}</label>
                <label className='año'>Popularidad: {rating}</label>
            </div>
        </div>
    )
}
