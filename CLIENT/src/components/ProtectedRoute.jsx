import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
    const { user } = useContext(UserContext)
    const isAuthenticated = !!user


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (requiredRole === 'user' && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole === 'admin' && (!isAuthenticated || user?.rol !== 'admin')) {
        return <Navigate to="/login" replace />
    }

    if ((requiredRole === 'user' || requiredRole === 'admin') && !isAuthenticated) {

        return <Navigate to="/login" replace />
    }

    return <Element {...rest} />
}

export default ProtectedRoute

