import React, { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    favorites: [],
  })

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }