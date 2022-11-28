import '../styles/ToolBar.css'
import logo from '../media/logo_transparent_mini.png'
import { useContext } from 'react'
import AppContext from '../context/context.js'

function Toolbar() {
  const context = useContext(AppContext)
  const { proyectSelected } = context

  return (
    <div className="toolbar">
      <div className="toolbar__logo">
        <img src={logo} alt="logo" className="mini_logo" /> 
      </div>
      <div className="toolbar__navigation_proyect">
        <p>{proyectSelected.title}</p>
      </div>
      <div></div>
    </div>
  )
}

export default Toolbar
