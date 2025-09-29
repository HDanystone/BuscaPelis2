import { Pelicula } from './Pelicula'

export function Listas({ aMostrar, tipo, lista }) {
    return (
        <div className='listas'>
            <div id={lista} className='listas'>
                {aMostrar?.map((peli, index) => {
                    return <Pelicula peli={peli} key={index} tipo={tipo} />
                })}
            </div>
        </div>
    )
}
