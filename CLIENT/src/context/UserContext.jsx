import { createContext, useState } from 'react' // pendiente backend

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    favorites: [],
  })

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }