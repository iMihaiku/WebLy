import '../styles/content.css'
import ProyectData from '../components/ProyectData.jsx'
import AppContext from '../context/context.js'
import { useContext, useState } from 'react'
import logo from '../media/logo_transparent_alter.png'
import {createProyect} from '../helpers/proyects_api.js'
import SettingContent from '../components/SettingContent.jsx'

export default function ControlContent({setNewProyect}) {
  const context = useContext(AppContext)
  const { proyectSelected, token } = context

  const [tabItem, setTabItem] = useState("0")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const URLDomain = e.target.URLDomain.value
    const res = await createProyect(token.token, title, description, URLDomain);
    setNewProyect(res);
  }
  const handleTabItem = (e) => {
    setTabItem(e.target.id)
  }
  return (
    <div className="proyect_container">
      {proyectSelected.id > -1 && (
        <>
          <div className="proyect_tabs_container">
            <div className="proyect_tab_list">
              <div className="proyect_tab_item" onClick={handleTabItem} id={0}>General</div>
              <div className="proyect_tab_item" onClick={handleTabItem} id={1}>Settings</div>
            </div>
          </div>
          {tabItem === "0" && (
            <ProyectData proyect={proyectSelected} token={token} />
          )}
          {tabItem === "1" && (
            <SettingContent proyect={proyectSelected} token={token} />
          )}
        </>
      )}
      {proyectSelected.id === -1 && (
        <div className="proyect_container__empty">
          <img className="central_logo" src={logo} alt="logo" />
        </div>
      )}
      {proyectSelected.id === -2 && (
        <div className="proyect_create">
          <div className="proyect_create__title">
            <h1>Create a new proyect</h1>
          </div>
          <div className="proyect_create__form">
            <form onSubmit={handleSubmit}>
              <div className="proyect_create__form__item">
                <div>
                  <label htmlFor="title">Title </label>
                  <input type="text" name="title" id="title" />
                </div>
                <div>
                  <label htmlFor="description">Description </label>
                  <textarea  name="description" id="description" />
                </div>
                <div>
                  <label htmlFor="url">URL </label>
                  <input type="text" name="url" id="URLDomain" />
                </div>
                <div>
                  <button type="submit">CREATE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
