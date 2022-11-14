import '../styles/content.css'
import ProyectData from '../components/ProyectData.jsx'
import AppContext from '../context/context.js'
import { useContext } from 'react'

export default function ControlContent() {
  const context = useContext(AppContext)
  const { proyectSelected, setproyectSelected, token } = context
  console.log(proyectSelected);
  return (
    <div className="proyect_container">
      {proyectSelected.id !== -1 ? (
        <ProyectData proyect={proyectSelected} token={token}/>
      ) : (
        <div className="proyect_container__empty"></div>
      )
      }

    </div>
  )
}
