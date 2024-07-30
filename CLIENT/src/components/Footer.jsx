import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <>
      <footer className="Footer">
        <h2>CONTACTO</h2>
        <section className='contacto'>
          <div>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/registro">Registro</Link>
              </li>
            </ul>
          </div>
        </section>
        <section className='logos'></section>
      </footer>
    </>
  )
}

export default Footer