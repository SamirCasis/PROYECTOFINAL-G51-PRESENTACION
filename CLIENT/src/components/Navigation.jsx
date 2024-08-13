import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import '../components/Navigation.css'
import { UserContext } from '../context/UserContext'

const Navigation = () => {
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const isAuthenticated = !!user
    const isAdmin = user?.rol === 'admin'

    const handleProfileClick = () => {
        if (isAdmin) {
            navigate('/admin')
        } else {
            navigate('/usersesion')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Navbar expand="lg" className="mainNav">
            <NavLink to='/' className='logoHome'>
                <img className='logoNav' src='https://imagizer.imageshack.com/img923/2874/NIWy7s.png' alt='Logo' />
            </NavLink>
            <Container className='buttonsNav col-5'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <>
                                <Button variant="dark" className='btnPerfil' onClick={handleProfileClick}>
                                    PERFIL
                                </Button>
                                <NavLink to='/carrito'>
                                    <Button variant="secondary">
                                        CARRITO
                                    </Button>
                                </NavLink>
                                <Button variant="danger" onClick={handleLogout}>
                                    SALIR
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login">
                                    <Button variant="dark" className='btnIniciar'>
                                        INGRESAR <FontAwesomeIcon icon={faUser} />
                                    </Button>
                                </NavLink>
                                <NavLink to='/register'>
                                    <Button variant="secondary">
                                        REGISTRO <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation




