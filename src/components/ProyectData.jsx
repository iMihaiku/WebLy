import ChartCustom from './ChartCustom'
import ChartCustom2 from './ChartCustom2'
import ProyectLog from './ProyectLog'
import { loadStats } from '../helpers/proyects_api.js'
import { useEffect, useState, useContext } from 'react'
import AppContext from '../context/context.js'
import useWebSocket from '../hooks/useWebSocket'
const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 }
]
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]
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
        dataParsed.push({ name: item.id, event: 1, avg: Math.round((1/eventos.length)*10000) })
      }
      if (index !== -1) {
        dataParsed[index].event++
        dataParsed[index].avg = Math.round((dataParsed[index].event/eventos.length)*100)
      }
    })
    setEvents(dataParsed)
  }
  
  useEffect(() => {
    setViewLocation([])
  }, [proyect.proyect.id])

  return (
    <>
      <div className="proyect_data">
        <div className="proyect_chart1">
          <div className="proyect_data_title">
            <h1>Average View</h1>
          </div>
          <div className="proyect_data_description">
            <p>
              This chart represent the averge engangement you got in your
              website
            </p>
          </div>
          <div className="proyect_data_content">
            {viewLocation ? (
              <ChartCustom2 newData={viewLocation} newDate={lastStat} token={proyect.token.token} id={proyect.proyect.id} />
            ) : (
              <div className="proyect_data_content__empty"></div>
            )}
          </div>

        </div>
        <div className="proyect_chart2">
          <div className="proyect_data_title">
            <h1>Time Spaced View</h1>
          </div>
          <div className="proyect_data_description">
            <p>Here you can see the traffic of your visits per week.</p>
          </div>
          <div className="proyect_data_content">
            <ChartCustom newData={events} token={proyect.token.token} id={proyect.proyect.id}/> 
          </div>
        </div>
      </div>
      <div className="proyect_log">
        {logs && <ProyectLog logs={logs}/>}
        <div className="script"></div>
      </div>
    </>
  )
}
