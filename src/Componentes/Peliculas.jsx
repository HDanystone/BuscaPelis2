import { Pelicula } from './Pelicula'

export function Peliculas() {
    return (
        <>
            {buscando === true ? (
                <>
                    <div className='spinnercontainer'>
                        <div className='spinner' />
                    </div>
                </>
            ) : (
                <>
                    <div className='peliculas'>
                        {peliculasAMostrar?.map((peli, index) => {
                            return <Pelicula peli={peli} key={index} />
                        })}
                    </div>
                </>
            )}
        </>
    )
}
//{ peliculasAMostrar, buscando, pedirDetalle }
