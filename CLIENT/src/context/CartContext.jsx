import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [properties, setProperties] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const navigate = useNavigate()
  const URL = './Properties.json'

  useEffect(() => {
    axios.get(URL)
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => {
        console.error("No se puede cargar la información de las propiedades: ", error)
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar propiedades',
          text: 'No se pueden cargar las propiedades en este momento. Por favor, inténtalo más tarde.',
        })
      })
  }, [])

  const propertiesHandle = (properties) => {
    setSelectedProperties(properties)
  }

  const irAlHome = () => {
    Swal.fire({
      title: '¿Confirmar Pago?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      }
    })
  }

  const agregarCarrito = (property) => {
    setCart(prevCart => {
      const existingProperty = prevCart.find(item => item.id === property.id);
      if (existingProperty) {
        return prevCart.map(item =>
          item.id === property.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...property, cantidad: 1 }];
      }
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "🏘️ Agregaste una Propiedad",
      showConfirmButton: false,
      timer: 1000
    });
  }

  const eliminarCarrito = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  }

  const sumaTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.cantidad || 1)), 0);
  }

  return (
    <CartContext.Provider value={{ properties, cart, agregarCarrito, eliminarCarrito, sumaTotal, propertiesHandle, irAlHome, selectedProperties }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider