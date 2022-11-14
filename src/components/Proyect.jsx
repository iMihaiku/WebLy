import "../styles/proyect.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";

export default function Proyect({ proyect, onClick }) {
  const [color , setColor] = useState();
  useEffect(() => {
    if (proyect.state === "online") setColor("green");
    if (proyect.state === "offline") setColor("red");
    if (proyect.state === "pending") setColor("yellow");
  }, [proyect.state]); 

  const handleProyectClick = () => {
    onClick(proyect);
  }
  
  return (
    <div className="user_proyects_container" onClick={handleProyectClick}>
      <div className="proyect_info">
        <div className="proyect_title">{proyect.title}</div>
        <div className="proyect_state">
          <FiberManualRecordIcon fontSize="small" style={{ color: color }} />
          {proyect.state}
          </div>
      </div>
      <div className="proyect_image">
        <Avatar src={proyect.URLDomain+"/favicon.ico"} style={{width: 28, height: 28}} />
      </div>
    </div>
  )
}
