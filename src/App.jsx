import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { BarraNavegar } from './Componentes/BarraNavegar'
import { Detalle } from './Componentes/Detalle'
import { Home } from './Componentes/Home'
import { Peliculas } from './Componentes/Peliculas'
import { PELI, SERIE } from './servicios/constantes'
function App() {
    const [peliOSerie, setPeliOSerie] = useState(PELI)
    const [valorCkbx, setValorCkbx] = useState(false)
    const cambiaSwitch = () => {
        const nValor = event.target.checked
        setValorCkbx(nValor)
        const nPeliOSerie = nValor ? SERIE : PELI
        setPeliOSerie(nPeliOSerie)
    }
    const ruta = useLocation()
    return (
        <>
            {ruta.pathname.includes('/detalle/') ? null : (
                <BarraNavegar cambiaSwitch={cambiaSwitch} valorCkbx={valorCkbx} />
            )}
            <Routes>
                <Route path='/' element={<Home tipo={peliOSerie} />} />
                <Route path='/detalle/:id' element={<Detalle />} />
                <Route path='/buscar' element={<Peliculas tipo={peliOSerie} />} />
            </Routes>
        </>
    )
}

export default App
