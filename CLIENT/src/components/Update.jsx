import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'

const Update = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({ ...userData, name, email })
    }

    return (
        <div>
            <h2>Actualiza tus datos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}

export default Update
