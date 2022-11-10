import '../styles/ToolBar.css';
import AppContext from "../context/context.js";
import { useContext } from "react";
import logo from '../media/logo_transparent_mini.png'

function Toolbar() {
  const context = useContext(AppContext)
  const { showToolBar } = context
  return (
    <div className="toolbar">
      <div className="toolbar__logo">

      </div>
      <div className="toolbar__navigation-items">
        <ul>
          {showToolBar 
            ? <>
                <li><img src={logo} alt="logo" className='mini_logo'/></li>
              <li><a href="/">Archivo</a></li>
              <li><a href="/">Editar</a></li>
              <li><a href="/">Seleccion</a></li>
              <li><a href="/">Ver</a></li>
              <li><a href="/">Ir</a></li></>
            : null } 

          
        </ul>
      </div>
    </div>
  );
}

export default Toolbar;