import '../styles/App.css'
import '../styles/index.css'
import Login from './Login'
import Dashboard from './Dashboard'
import AppContext from '../context/context.js'
import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import { Navigate } from 'react-router-dom'

function App() {
  const context = useContext(AppContext)
  const { token, setToken } = context
  useEffect(() => {
    if (token) {
      document.querySelector('#root').style.background = '#222b33'
    }
  }, [token]);
  return (
    <div className="body">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              token === null ? <Login setToken={setToken} /> : <Dashboard token={token} />
            }
          />
          <Route
            path="/signup"
            element={
              token === null ? (
                <SignUp setToken={setToken} />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App