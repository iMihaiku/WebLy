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
          `ws://web-production-d709.up.railway.app/proyectos/cargarEstadisticas?tokenUsuario=${token}&idProyecto=${id}`
        )
  
        ws.onmessage = (event) => {
          datos = JSON.parse(event.data)
          console.log(datos);
          count > 0 ? setLastStat([datos]) : count++ 
        }
      }, 3000)
      setTimeout(() => {
        console.log("close");
        ws.send('disconnect')
        ws.close()
      }, 600000)
    }
  }, [id])


  return { lastStat }
}
