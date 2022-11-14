const loadProyects = async (token) => {
  const datos = await fetch(`http://localhost:3001/proyectos/cargarProyectos`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}
const createProyect = async (id, token, titulo, descripcion, URLDomain) => {
  const datos = await fetch(`http://localhost:3001/proyectos/crear`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      descripcion: descripcion,
      URLDomain: URLDomain
    })
  }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data
    }) 
  return datos
}
const loadLogs = async (token, id) => {
  const datos = await fetch(`http://localhost:3001/proyectos/cargarLogs?id=${id}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }).then((res) => res.json())
    .then((data) => {
      return data
    })
  return datos
}

export { loadProyects, createProyect, loadLogs }
