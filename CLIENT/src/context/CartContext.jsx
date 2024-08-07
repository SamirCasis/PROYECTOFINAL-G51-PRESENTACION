import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { PropertiesContext } from './PropertiesContext'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const { properties } = useContext(PropertiesContext)

  const agregarCarrito = (propertyId) => {
    const property = properties.find(prop => prop.id === propertyId)
    if (property && !cart.some(item => item.id === property.id)) {
      setCart([...cart, property])
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "🏠 Agregaste una Propiedad",
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Ya está en el carrito',
        text: 'Esta propiedad ya ha sido agregada al carrito',
      })
    }
  }

  const eliminarCarrito = (id) => {
    const updatedCart = cart.filter(property => property.id !== id)
    setCart(updatedCart)
  }

  const eliminarTodoCarrito = () => {
    setCart([])
  }

  const sumaTotal = () => {
    return cart.reduce((total, property) => total + (property.price || 0), 0)
  }

  const irAlHome = () => {
    Swal.fire({
      title: '¿Confirmar Pago?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTodoCarrito()
        navigate('/')
      }
    })
  }

  return (
    <CartContext.Provider value={{ cart, agregarCarrito, eliminarCarrito, eliminarTodoCarrito, sumaTotal, irAlHome }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
