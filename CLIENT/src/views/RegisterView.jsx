import React from 'react'
import Register from '../components/Register'
import './RegisterView.css'

const RegisterView = () => {
    return (
        <>
            <main className="registroTitulo">
                        <h1>CREA TU CUENTA</h1>
                <section className='formulario2'>
                    <Register />
                </section>
            </main>
        </>
    )
}

export default RegisterView