import Profile from './Profile'
import Proyect from './Proyect'
import Icon from './Icon'
import { createProyect, loadProyects, downloadWeblyFile, loadStats, deleteProyect } from '../helpers/proyects_api.js'
import { useEffect, useState, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AppContext from '../context/context.js'


export default function ControlUser({token, newProyect}) {
  const context = useContext(AppContext)
  const { proyectSelected , setproyectSelected } = context

  const [proyects, setProyects] = useState([]);
  useEffect(() => {
    proyects.length === 0 && loadProyects(token.token).then(data => {
      data.length > 0 && setProyects(data)
    });
  },);
  useEffect(() => {
    newProyect && setProyects([...proyects, newProyect]);
    newProyect && setproyectSelected(newProyect)
  }, [newProyect]); 

  const handleCreateProyect = async() => {
    setproyectSelected({title:"Create a new Project", id:-2})
  }
  const handleDeleteProyect = async() => {
    deleteProyect(token, proyectSelected)
    setProyects(proyects.filter(proyect => proyect.id !== proyectSelected.id))
    setproyectSelected({title:"Project unselected", id:-1})
    //downloadWeblyFile(token, proyectSelected)
    //loadStats(token, proyectSelected)
  }
  const handleSelectProyect = (e) => {
    setproyectSelected(e)
  }
  return (
    <div className="user_container">
      <div className="user_proyects">
        {proyects.length > 0 
          ? proyects.map((proyect) => (
            <Proyect key={proyect.id} proyect={proyect} onClick={handleSelectProyect}/>
            
          ))
          : <div>No hay proyectos</div>
        }
      </div>
      <div className="user_profile">
        <div className="user_add_proyect">
          <button className="user_add_proyect_button" onClick={handleCreateProyect} >NEW PROYECT</button>
          <button className="user_delete_proyect" onClick={handleDeleteProyect}>
            <DeleteForeverIcon fontSize='large' />
          </button>
        </div>
        <div className="user_settings">
          <Profile />
        </div>
      </div>
    </div>
  )
}
