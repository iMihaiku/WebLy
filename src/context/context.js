import React, { useState } from 'react'

const Context = React.createContext({})

export function AppContext({ children }) {
  const [proyectSelected, setproyectSelected] = useState({title:"Proyecto no seleccionado", id:-1})
  let tokenLocal = null
  if(localStorage.getItem('token') !== null){
    tokenLocal = {token:localStorage.getItem('token')}
  }
  const [token, setToken] = useState(tokenLocal)
  return <Context.Provider value={{ token, setToken, proyectSelected, setproyectSelected }}>
    {children}
  </Context.Provider>
}


export default Context
