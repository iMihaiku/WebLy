import ChartCustom from './ChartCustom'
import ChartCustom2 from './ChartCustom2'
import ProyectLog from './ProyectLog'
import { loadStats } from '../helpers/proyects_api.js'
import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/context.js'
import useWebSocket from '../hooks/useWebSocket'

export default function ProyectData(proyect, token) {
  
  const [viewLocation, setViewLocation] = useState([])
  const [events, setEvents] = useState([])
  const [logs, setLogs] = useState([])
  const { lastStat } = useWebSocket(proyect.token.token, proyect.proyect.id)
  useEffect(() => {

    if (lastStat[0] !== undefined) {
      const { visitas, eventos } = lastStat[0]
      handleViewLocation(visitas)
      handleEvents(eventos)
      handleLogs(lastStat[0])
    } 
  }, [lastStat])

  function handleViewLocation(visitas) {
   
    let dataParsed = []
    visitas.forEach((item) => {
      const index = dataParsed.findIndex((element) => element.name === item.url)
      if (index === -1) {
        dataParsed.push({ name: item.url, value: 1 })
      }
      if (index !== -1) {
        dataParsed[index].value++
      }
    })
    setViewLocation(dataParsed)
  }

  function handleEvents(eventos) {
    console.log(eventos);
    let dataParsed = []
    eventos.forEach((item) => {
      const index = dataParsed.findIndex((element) => element.name === item.id)
      if (index === -1) {
        dataParsed.push({ name: item.id, event: 1, avg: Math.round((1/eventos.length)*100) })
      }
      if (index !== -1) {
        dataParsed[index].event++
        dataParsed[index].avg = Math.round(dataParsed[index].event/eventos.length)
      }
    })
    setEvents(dataParsed)
  }

  function handleLogs(newStats) {
    let newLog = {ip: newStats["ips"], date: newStats["fecha"], log: "New stats loaded on proyect"}
    console.log(newLog);
    setLogs(newLog)
  }
  
  useEffect(() => {
    setViewLocation([])
    setEvents([])
    setLogs([])
  }, [proyect.proyect.id])

  return (
    <>
      <div className="proyect_data">
        <div className="proyect_chart1">
          <div className="proyect_data_title">
            <h1>Views per location</h1>
          </div>
          <div className="proyect_data_description">
            <p>
            This chart represents the total and percentage visits in each relative route of the project.
            </p>
          </div>
          <div className="proyect_data_content">
            {viewLocation ? (
              <ChartCustom2 newData={viewLocation} token={proyect.token.token} id={proyect.proyect.id} />
            ) : (
              <div className="proyect_data_content__empty"></div>
            )}
          </div>

        </div>
        <div className="proyect_chart2">
          <div className="proyect_data_title">
            <h1>Events Tracker</h1>
          </div>
          <div className="proyect_data_description">
            <p>Here you can see the different events occurred in the project</p>
          </div>
          <div className="proyect_data_content">
            <ChartCustom newData={events} token={proyect.token.token} id={proyect.proyect.id}/> 
          </div>
        </div>
      </div>
      <div className="proyect_log">
        {<ProyectLog logs={logs} id={proyect.proyect.id} token={proyect.token.token}/>}
        <div className="script"></div>
      </div>
    </>
  )
}
