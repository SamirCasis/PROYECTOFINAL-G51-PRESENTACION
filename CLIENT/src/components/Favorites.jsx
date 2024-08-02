import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

const Favorites = () => {
  const { userData } = useContext(UserContext)

  return (
    <div>
      <h2>Tus favoritos</h2>
      <ul>
        {userData.favorites.map((favorite, index) => (
          <li key={index}>{favorite}</li>
        ))}
      </ul>
    </div>
  )
}

export default Favorites
