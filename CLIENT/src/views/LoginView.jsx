import React from 'react'
import Sesion from '../components/Login'
import './LoginView.css'

const LoginView = () => {
    return (
        <>
            <main className="registro">
                <h1>INICIAR SESION</h1>
                <section className='formulario1'>
                    <Sesion />
                </section>
            </main>
        </>
    )
}

export default LoginView