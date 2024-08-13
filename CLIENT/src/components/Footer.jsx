import { Link } from 'react-router-dom'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <>
      <footer className="Footer">
        <h2>CONTACTO</h2>
        <main className='mainFooter'>
          <section className='linkFooter'>
            <ul type='none'>
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/register">REGISTRO</Link></li>
              <li><Link to="/login">INICIAR SESION</Link></li>
            </ul>
          </section>
          <article className='logoFooter'>
            <img src='https://imagizer.imageshack.com/img923/2874/NIWy7s.png' alt='logo Empresa' />
          </article>
          <section className='contacto'>
            <a
              href='https://www.facebook.com/people/SAYE-Corredora-de-propiedades/100054802388541/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faFacebook} size="3x" />
            </a>
            <ul type='none'>
              <li>Avda. Concha y Toro 6022, Puente Alto, Santiago</li>
              <li>Teléfono: +56 9 9826 3000  +56 9 9538 6000</li>
              <li>E-mail: ventas.ysalas@gmail.cl</li>
            </ul>
          </section>
        </main>
      </footer>
    </>
  )
}

export default Footer