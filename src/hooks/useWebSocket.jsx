import React, { useEffect, useState } from 'react'

export default function useWebSocket( token, id ) {
  const [lastStat, setLastStat] = useState([])
  let datos = []
  useEffect(() => {
    if (id) {
      let ws
      let count = 0
      setTimeout(() => {
         ws = new WebSocket(
          `ws://localhost:3001/proyectos/cargarEstadisticas?tokenUsuario=${token}&idProyecto=${id}`
        )
  
        ws.onmessage = (event) => {
          datos = JSON.parse(event.data)
          console.log(datos);
          count > 0 ? setLastStat([datos]) : count++ 
        }
      }, 5000)
      setTimeout(() => {
        console.log("close");
        ws.send('disconnect')
        ws.close()
      }, 60000)
    }
  }, [id])


  return { lastStat }
}
