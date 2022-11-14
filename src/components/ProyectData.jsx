import ChartCustom from './ChartCustom'
import ChartCustom2 from './ChartCustom2'
import ProyectLog from './ProyectLog'
import { loadLogs } from '../helpers/proyects_api.js'
import { useEffect, useState } from 'react'

export default function ProyectData({ proyect, token }) {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    loadLogs(token.token, proyect.id).then((data) => {
      setLogs(data)
    })
  },[])

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
            <ChartCustom2 />
          </div>
          <div className="proyect_data_info">
            <p>Info</p>
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
            <ChartCustom />
          </div>
          <div className="proyect_data_info">
            <p>Info</p>
          </div>
        </div>
      </div>
      <div className="proyect_log">
        {
          logs && <ProyectLog logs={logs}/>
        }
      </div>
    </>
  )
}
