export default function ProyectLog({logs}) {
  return (
    <div className="proyect_log_container">
      <div className="proyect_log_title">
        <h1>Log</h1>
      </div>
      <div className="proyect_log_content">
        <pre>
          {logs.map((log) => (            
            <code key={log.id} >
              {new Date(log.date.seconds*1000 + log.date.nanoseconds/1000).toLocaleTimeString() +" - "+ log.log}
              </code>
          ))}
        </pre>
      </div>
    </div>
  )
}
