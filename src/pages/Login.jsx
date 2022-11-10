import logo from '../media/WebLy-Logo-R.png'
import '../styles/login.css'
import { login } from '../helpers/login_api.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login({ setToken }) {
  const [error, setError] = useState({
    visibility: 'hidden',
    opacity: '0',
    message: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get('email')
    const password = data.get('password')
    const token = await login(email, password)

    if (token.error) {
      //set timer
      setError({ visibility: 'visible', opacity: '1', message: token.error })
      setTimeout(() => {
        setError({ visibility: 'hidden', opacity: '0' })
      }, 3200)
    } else {
      localStorage.setItem('token', token.token)
      setToken(token)
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login_form_container">
        <div className="login__title">
          <h1>¡Bienvenido!</h1>
          <p>¡Siempre supimos que volveriamos a verte!</p>
        </div>
        <div className="login__form">
          <div
            className="login_error"
            style={{ visibility: error.visibility, opacity: error.opacity }}
          >
            <p>{error.message}</p>
          </div>
          <div className="login__form__inputs">
            <label htmlFor="email">
              CORREO ELECTRONICO O NOMBRE DE USUARIO
            </label>
            <input type="text" name="email" className="inputs" />
          </div>
          <div className="login__form__inputs">
            <label htmlFor="password">CONTRASEÑA</label>
            <input type="password" name="password" className="inputs" />
          </div>
          <div className="login__link">
            <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="login__form__button">
            <button type="submit">Iniciar Sesión</button>
          </div>
          <div className="login__link">
            <p>
              ¿No tienes una cuenta? <Link to={'/signup'}>Registrate</Link>
            </p>
          </div>
        </div>
      </form>
      <div className="login_logo">
        <img src={logo} alt="logo" />
        <p> Tecnologia de analisis y recopilacion de metricas web</p>
      </div>
    </div>
  )
}
