import React, { useState, useEffect } from 'react'
import { loadStats } from '../helpers/proyects_api'

export default function ProyectLog({logs, id, token}) {
  const [totalLogs, setTotalLogs] = useState([])

  useEffect(() => {
    loadStats(id, token).then((res) => {
      console.log(res);
      let l1 = []
      res.forEach(element => {
        l1.push({ip: element.ips, date: element.fecha, log: "New stats loaded on proyect"})
      })
      setTotalLogs(l1)
    })

  }, [id])
  useEffect(() => {
    if (logs.log!==undefined) setTotalLogs([...totalLogs, logs])
  }, [logs])

  return (
    <div className="proyect_log_container">
      <div className="proyect_log_title">
        <h1>Log</h1>
      </div>
      <div className="proyect_log_content">
        <pre>
          {
          totalLogs.length>0 && totalLogs.map((log, index) => (            
            <code key={index} >
              {new Date(log.date.seconds*1000 + log.date.nanoseconds/1000).toISOString().replace("T", " ") +" - "+ log.ip +" - "+ log.log}
              </code>
          ))}
        </pre>
      </div>
    </div>
  )
}
