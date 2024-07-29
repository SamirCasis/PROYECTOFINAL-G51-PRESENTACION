import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const PizzasContext = createContext()

const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState([])
  const [cart, setCart] = useState([])
  const url = './pizzas.json'
  const navigate = useNavigate()

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("No se puede cargar la información de las pizzas")
        }
        const data = await response.json()
        setPizzas(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPizzas()
  }, [])

  const pizzaHandle = (pizza) => {
    setSelectedPizza(pizza)
  }

  const irAlDetalle = (id) => {
    navigate(`/pizza/${id}`)
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

  const agregarCarrito = (pizza) => {
    setCart([...cart, pizza])
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "🍕 Agregaste una Pizza",
      showConfirmButton: false,
      timer: 1000
    })
  }

  const eliminarCarrito = (id) => {
    const updatedCart = cart.filter(pizza => pizza.id !== id)
    setCart(updatedCart)
  }

  const sumaTotal = () => {
    return cart.reduce((total, pizza) => total + pizza.price, 0)
  }


  return (
    <PizzasContext.Provider value={{ pizzas, cart, agregarCarrito, eliminarCarrito, sumaTotal, pizzaHandle, irAlDetalle, irAlHome, selectedPizza }}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasProvider