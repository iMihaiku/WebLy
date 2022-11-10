import logo from '../media/WebLy-Logo-R.png'
import '../styles/signup.css'
import { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { signup } from '../helpers/login_api'
import { useNavigate } from 'react-router-dom'


export default function SignUp({ setToken }) {
  const navigate = useNavigate()
  const [password, setPassword] = useState([])
  const [passwordConfirm, setPasswordConfirm] = useState([])
  const [button, setButton] = useState({
    error: '',
    passwordValid: false,
    passwordConfirmed: false,
    checked: false
  })
  const [error, setError] = useState({
    visibility: 'hidden',
    opacity: '0',
    message: ''
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get('email')
    const password = data.get('password')
    const token = await signup(email, password)
    console.log(token);
    if (token.error) {
      setError({ visibility: 'visible', opacity: '1', message: token.error })
      setTimeout(() => {
        setError({ visibility: 'hidden', opacity: '0' })
      }, 3200)
    } else {
      localStorage.setItem('token', token.token)
      setToken(token)
      navigate('/')
    }
  }
  function handlePassword(e) {
    setPassword(e.target.value)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (regex.test(e.target.value)) {
      passwordConfirm === e.target.value
        ? setButton({ ...button, passwordConfirmed: true, passwordValid: true })
        : setButton({ ...button, passwordConfirmed: false })
    } else {
      setButton({ ...button, passwordValid: false })
    }
  }
  function handleConfirmPassword(e) {
    setPasswordConfirm(e.target.value)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (regex.test(e.target.value)) {
      password === e.target.value
        ? setButton({ ...button, passwordConfirmed: true, passwordValid: true })
        : setButton({ ...button, passwordConfirmed: false })
    } else {
      setButton({ ...button, passwordValid: false })
    }
  }
  function handleCheck(e) {
    setButton({ ...button, checked: e.target.checked })
  }
  return (
    <div className="signup">
      <form className="signup_form_container" onSubmit={handleSubmit}>
        <div className="signup__title">
          <h1>Crear una cuenta</h1>
          <p>¡Gracias por confiar en nosotros!</p>
        </div>
        <div className="signup__form">
        <div
            className="signup_error"
            style={{ visibility: error.visibility, opacity: error.opacity }}
          >
            <p>{error.message}</p>
          </div>
          <div className="signup__form__inputs">
            <label htmlFor="email">
              CORREO ELECTRONICO O NOMBRE DE USUARIO
            </label>
            <input type="text" name="email" id="email" className="inputs" />
          </div>
          <div className="signup__form__inputs">
            <label htmlFor="password">CONTRASEÑA</label>
            <Tooltip
              title="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
              placement="top-start"
            >
              <input
                type="password"
                name="password"
                className="inputs"
                value={password}
                onChange={handlePassword}
              />
            </Tooltip>
          </div>
          <div className="signup__form__inputs">
            <label htmlFor="password">CONFIRMAR CONTRASEÑA</label>
            <Tooltip
              title="Las contraseñas deben coincidir"
              placement="top-start"
            >
              <input
                type="password"
                name="passwordRepeated"
                className="inputs"
                value={passwordConfirm}
                onChange={handleConfirmPassword}
              />
            </Tooltip>
          </div>
          <div className="signup__link">
            <input
              type={'checkbox'}
              className="checkTOS"
              onChange={handleCheck}
            />
            <label style={{ textAlign: 'left' }}>
              {' '}
              Estoy de acuerdo con el tratamiento de datos y acepto los terminos
              y condiciones de uso
            </label>
          </div>
          <div className="signup__form__button">
            <button
              type="submit"
              disabled={
                !(
                  button.checked &&
                  button.passwordConfirmed &&
                  button.passwordValid
                )
              }
            >
              REGISTRARSE
            </button>
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
