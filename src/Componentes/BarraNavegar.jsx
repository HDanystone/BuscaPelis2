import { BarraBuscar } from './BarraBuscar'
import { Switch } from './Switch'
import fondo from '../assets/header.jpg'

export function BarraNavegar({ cambiaSwitch, valorCkbx }) {
    return (
        <div className='barraNavegar' style={{ backgroundImage: `url(${fondo})` }}>
            <div className='logo'>
                <label className='mas'>+</label>
                <label className='pelis'>Pelis</label>
            </div>
            <Switch cambiaSwitch={cambiaSwitch} valorCkbx={valorCkbx} />
            <BarraBuscar />
        </div>
    )
}
