import Profile from './Profile'
import Proyect from './Proyect'
import Icon from './Icon'
import { createProyect, loadProyects, downloadWeblyFile, loadStats } from '../helpers/proyects_api.js'
import { useEffect, useState, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AppContext from '../context/context.js'


export default function ControlUser({token}) {
  const context = useContext(AppContext)
  const { proyectSelected , setproyectSelected } = context

  const [proyects, setProyects] = useState([]);
  const [newProyect, setNewProyect] = useState();
  useEffect(() => {
    proyects.length === 0 && loadProyects(token.token).then(data => {
      data.length > 0 && setProyects(data)
    });
  },);
  useEffect(() => {
    newProyect && setProyects([...proyects, newProyect]);
  }, [newProyect]); 

  const handleCreateProyect = async() => {
    const title = "Proyecto 1";
    const description = "Descripción del proyecto 1";
    const id = proyects.length > 0 ? proyects[proyects.length - 1].id + 1 : 1;
    const URLDomain = "https://www.flaticon.es";
    const res = await createProyect(id, token.token, title, description, URLDomain);
    setNewProyect(res);
  }
  const handleDeleteProyect = async() => {
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
