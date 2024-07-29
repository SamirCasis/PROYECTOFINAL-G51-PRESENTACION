import React from 'react'
import Sesion from '../components/Sesion'
import './SesionView.css'

const SesionView = () => {
    return (
        <>
            <main className="registro">
                <h1>INICIA SESION</h1>
                <section className='formulario1'>
                   <Sesion />
                </section>
            </main>
        </>
    )
}

export default SesionView