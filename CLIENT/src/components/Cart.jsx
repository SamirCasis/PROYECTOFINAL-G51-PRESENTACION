import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Button, Table } from 'react-bootstrap'
import './Cart.css'

const Cart = () => {
  const { cart, eliminarCarrito, eliminarTodoCarrito, sumaTotal, irAlHome } = useContext(CartContext)

  return (
    <main className='cartContainer'>
      <article className='cartTitle'>
        <h2>Carrito de Compras</h2>
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
                    <img src={property.img} alt={property.title} style={{ width: '100px' }} />
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
        <Button variant='success' onClick={irAlHome}> PAGAR </Button>
      </footer>
    </main>
  )
}

export default Cart



