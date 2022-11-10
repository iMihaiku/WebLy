import React, { useState } from 'react'

const Context = React.createContext({})

export function AppContext({ children }) {
  const [showToolBar, setShowToolBar] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token'))
  return <Context.Provider value={{ showToolBar, setShowToolBar,token, setToken }}>
    {children}
  </Context.Provider>
}


export default Context
