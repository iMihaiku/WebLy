import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './pages/App.jsx'
import { HashRouter } from 'react-router-dom'
import { AppContext } from './context/context.js';
import ToolBar from './pages/Toolbar.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <AppContext>
      <HashRouter>
        <ToolBar />
        <App />
      </HashRouter>
    </AppContext>

)
