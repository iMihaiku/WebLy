const login = async (username, password) => {
  console.log('login', username, password)
  const datos = await fetch('http://localhost:3001/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      hashpass: password
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data
    })
  return datos
}
const signup = async (username, password) => {
  const datos = await fetch('http://localhost:3001/usuarios/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      hashpass: password
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data
    })
  return datos
}
export  {
  login,
  signup
}
