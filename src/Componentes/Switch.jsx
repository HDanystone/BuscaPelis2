export function Switch({ cambiaSwitch, valorCkbx }) {
    return (
        <div className='switchContainer'>
            <label> Películas</label>
            <input
                type='checkbox'
                id='cambiar'
                className='noVisible'
                onChange={cambiaSwitch}
                checked={valorCkbx}
            />
            <label htmlFor='cambiar' className='switch'></label>
            <label>Series </label>
        </div>
    )
}
