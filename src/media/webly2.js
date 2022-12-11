
function generateScript(tokenApi, proyectId) {
  return`
  const tokenKey = 'Bearer ${tokenApi}'
  const proyectId = ${proyectId}
  const time = 350000 // menos de 5 minutos

  document.addEventListener('DOMContentLoaded', async function () {
   let validation
   localStorage.getItem('validated') === 'true'
     ? (validation = localStorage.getItem('validated'))
     : (validation = await validateProyect())
  
   validation
     ? startViews()
     : console.log('Hubo un error al validar el proyecto')
  })
  //listen all click events
  document.addEventListener('click', async function (e) {
   let validation
   localStorage.getItem('validated') === 'true'
     ? (validation = localStorage.getItem('validated'))
     : (validation = await validateProyect())
  
   validation
     ? startEvents(e)
     : console.log('Hubo un error al validar el proyecto')
  })
  
  async function validateProyect() {
   const result = await fetch('http://localhost:3001/estadisticas/validar', {
     method: 'POST',
     headers: {
       authorization: tokenKey,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       id: proyectId
     })
   })
     .then((response) => response.json())
     .then((data) => {
       localStorage.setItem('validated', data.validated)
       localStorage.setItem('ip', data.ip)
       return data.validated
     })
   return result
  }
  function startViews() {
   let views = []
   let savedViews = []
   const acutalView = {
     url: window.location.href,
     date: new Date()
   }
   localStorage.getItem('views') !== null &&
     ((savedViews = JSON.parse(localStorage.getItem('views'))),
     savedViews.map((view) => views.push(view)))
   let validVisit
  
   views.length > 0 &&
     (validVisit = Date.now() - new Date(views[views.length - 1].date) < 20000)
   validVisit ? console.log('Poco tiempo entre visitas') : views.push(acutalView)
   localStorage.setItem('views', JSON.stringify(views))
  }
  function startEvents(e) {
   let events = []
   let savedEvents = []
   const acutalEvent = {
     evento: e.type,
     etiqueta: e.target.tagName,
     clase: e.target.className,
     id: e.target.id
   }
   localStorage.getItem('events') !== null &&
     ((savedEvents = JSON.parse(localStorage.getItem('events'))),
     savedEvents.map((view) => events.push(view)))
   events.push(acutalEvent)
   localStorage.setItem('events', JSON.stringify(events))
  }
  function saveStats() {
   setInterval(async function () {
     const views = JSON.parse(localStorage.getItem('views'))
     const events = JSON.parse(localStorage.getItem('events'))
     const ip = localStorage.getItem('ip')
     Date.now() - new Date(views[0].date) > time &&
       (await fetch('http://localhost:3001/estadisticas/agregarEstadisticas', {
         method: 'POST',
         headers: {
           authorization: tokenKey,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           idProyecto: proyectId,
           ips: ip,
           visitas: views,
           eventos: events
         })
       })
         .then((response) => response.json())
         .then((data) => {
           localStorage.removeItem('views')
           localStorage.removeItem('events')
           localStorage.removeItem('ip')
         }))
   }, 15000)
  }
  `
}
    
export default generateScript