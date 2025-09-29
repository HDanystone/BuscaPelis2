import { Paginado } from './Paginado'
import { Banner } from './Banner'
import { POPULAR, NUEVO, PROXIMO, PELI, AIRE, MAS_VALUADAS } from '../servicios/constantes'

export function Home({ tipo }) {
    const proximo = tipo === PELI ? NUEVO : AIRE
    const mejores = tipo === PELI ? PROXIMO : MAS_VALUADAS
    return (
        <>
            <Banner tipo={tipo} />
            <h1>Novedades</h1>
            <Paginado lista={mejores} tipo={tipo} />
            <h1>Populares</h1>
            <Paginado lista={MAS_VALUADAS} tipo={tipo} />
            <h1>Próximamente</h1>
            <Paginado lista={POPULAR} tipo={tipo} />
        </>
    )
}
