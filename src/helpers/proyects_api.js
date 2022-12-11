import generateScript from '../media/webly2.js'

const loadProyects = async (token) => {
  const datos = await fetch(`${process.env.REACT_APP_API_URL}/proyectos/cargarProyectos`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}
const deleteProyect = async (token, id) => {

  const datos = await fetch(`${process.env.REACT_APP_API_URL}/proyectos/borrarProyecto`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id.id
    })
  })
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}

const createProyect = async (token, titulo, descripcion, URLDomain) => {
  console.log(token, descripcion, URLDomain);
  const datos = await fetch(`${process.env.REACT_APP_API_URL}/proyectos/crear`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      titulo: titulo,
      descripcion: descripcion,
      URLDomain: URLDomain
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return data
    })
  return datos
}
const loadLogs = async (token, id) => {
  const datos = await fetch(
    `${process.env.REACT_APP_API_URL}/proyectos/cargarLogs?id=${id}`,
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}
const loadStats = async (id, token) => {
  const datos = await fetch(
    `${process.env.REACT_APP_API_URL}/estadisticas/cargarEstadisticas`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}

function downloadWeblyFile(token, proyectSelected) {
  //download file from ./media/webly.js
  if(proyectSelected.id === -1) return false 

  const element = document.createElement('a')
  const file = new Blob([generateScript(token.token, proyectSelected.id)], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = 'webly.js'
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()

}

export { loadProyects, createProyect, loadLogs, downloadWeblyFile, loadStats, deleteProyect }
