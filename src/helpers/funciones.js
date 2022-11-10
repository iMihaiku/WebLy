export default async function helpers() {
  const result = await fetch('http://192.168.1.39:3001/usuarios/login', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": "email",
      "hashpass": "1234"
  })
      }).then(res => res.json())
        .then(data => {return data})
        .catch(err => {return err})
  return result
}
