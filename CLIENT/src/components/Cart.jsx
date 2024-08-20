import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import { Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cart, eliminarCarrito, eliminarTodoCarrito, sumaTotal } = useContext(CartContext)
  const { userData } = useContext(UserContext)
  const userId = userData?.id
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200'

  const handlePayment = async () => {
    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo procesar el pago. Usuario no encontrado.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return
    }

    try {
      const responses = await Promise.all(cart.map(property =>
        axios.post(`${API_URL}/api/v1/transactions`, {
          user_id: userId,
          property_id: property.id
        }, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
      ))

      const transactionId = responses[0]?.data?.id

      if (!transactionId) {
        throw new Error('No se pudo obtener el ID de la transacción')
      }

      const transactionResponse = await axios.get(`${API_URL}/api/v1/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })

      const transaction = transactionResponse.data

      Swal.fire({
        title: 'Compra Realizada',
        html: `
          <p><strong>Propiedades Compradas:</strong> ${cart.map(p => p.title).join(', ')}</p>
          <p><strong>Valor Total:</strong> ${sumaTotal()} UF</p>
          <p><strong>Fecha de Compra:</strong> ${new Date(transaction.purchase_date).toLocaleDateString()}</p>
          <p><strong>Correo de Contacto:</strong> ventas.ysalas@gmail.com</p>
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        eliminarTodoCarrito()
        navigate('/')
      })
    } catch (error) {
      console.error('Error al procesar el pago', error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar el pago. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <main className='cartContainer'>
      <article className='cartTitle'>
        <h2>Carrito de Compras 🛒</h2>
      </article>
      <section className='cartDetail'>
        {cart.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((property) => (
                <tr key={property.id}>
                  <td>
                    <img src={property.imgurl} alt={property.title} />
                  </td>
                  <td>{property.title}</td>
                  <td>{property.price} UF</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => eliminarCarrito(property.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No se han cargado propiedades al carrito</p>
        )}
      </section>
      <footer className='cartFooter'>
        <h3>Total: {sumaTotal()} UF</h3>
        <Button
          variant='warning'
          onClick={eliminarTodoCarrito}
        >
          Eliminar Todo
        </Button>
        <Button variant='success' onClick={handlePayment}>PAGAR</Button>
      </footer>
    </main>
  )
}

export default Cart
