import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Button } from 'react-bootstrap'
import './Cart.css'

const Cart = () => {
    const { cart, eliminarCarrito, sumaTotal, agregarCarrito, irAlHome } = useContext(CartContext)

    return (
        <main className='cartContainer'>
            <article className='cartTitle'>
                <h2>Carrito de Compras</h2>
            </article>
            <section className='cartDetail'>
                {cart.length > 0 ? (
                    cart.map(item => {
                        const price = Number(item.price);
                        const cantidad = Number(item.cantidad || 1);
                        if (isNaN(price) || isNaN(cantidad)) {
                            return <p key={item.id}>Datos de precio o cantidad no válidos para la propiedad con id {item.id}</p>
                        }

                        return (
                            <ul key={item.id}>
                                <li type='none'>
                                    <img src={item.img} alt={item.title} />
                                    {item.title} - ${price * cantidad}
                                    <button className='bg-danger text-white' onClick={() => disminuirMultiplicador(item.id)}>-</button>
                                    <span>llevas: {cantidad}</span>
                                    <button className='bg-primary text-white' onClick={() => agregarCarrito(item)}>+</button>
                                    <button className='bg-warning' onClick={() => eliminarCarrito(item.id)}>Eliminar Total</button>
                                </li>
                            </ul>
                        )
                    })
                ) : (
                    <p>No hay propiedades en el carrito.</p>
                )}
            </section>
            <footer className='cartFooter'>
                <h3>Total: ${sumaTotal()}</h3>
                <Button className='bg-success' onClick={irAlHome}> PAGAR </Button>
            </footer>
        </main>
    )
}


export default Cart
