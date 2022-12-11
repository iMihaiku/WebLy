import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import { downloadWeblyFile } from '../helpers/proyects_api.js'

export default function SettingContent({proyect, token}) {
  const handleDownload = async() => {
    downloadWeblyFile(token, proyect)
  }
  return (
    <div className="proyect_data">
      <div className="proyect_settings">
        <div className="proyect_settings_title">Settings</div>
        <div className="proyect_settings_container">
          <div className="proyect_settings_container_left">
            <p>
              A continuacion le dejamos el fichero <strong> webly.js </strong>{' '}
              que debe descargar y añadir a su proyecto web como se le indica en
              esta seccion.
            </p>
            <br />
            <p>
              Una vez añadido el fichero, y transcurridos 5 minutos, se enviaran
              los primeros datos al servidor y se mostraran automaticamente en
              el apartado correspondiente del proyecto.
            </p>

            <br />
            <p>
              Actualmente, para evitar la sobresaturacion de la base de datos,
              he decidido que las estadisticas se envien cada 5 minutos, pero se
              puede modificar el tiempo de envio en el fichero{' '}
              <strong> webly.js </strong> que se descarga en esta seccion. Lo
              unico que hay que hacer es modificar la variable{' '}
              <strong> time </strong> que se encuentra en la linea 3 del
              fichero.
            </p>
            <br />
            <p>
              Este fichero esta abierto a modificacines, es decir, si se desea
              añadir mas funcionalidades, se puede hacer. Pero las
              funcionalidades que se añadan deben ser compatibles con el
              servidor, ya que este es el encargado de procesar los datos.
              Ademas se ha de tener en cuenta que no se recomiendad de ninguna
              manera modificar las funciones ya existentes, ya que pueden causar
              errores.
            </p>
            <br />
            <p>
              En caso de cualquier duda, no dude en enviar un correo a{' '}
              <strong> joseluisbpalencia@gmail.com </strong>
            </p>
          </div>
          <div className="proyect_settings_container_right">
            
            <div className="proyect_settings_code">
              <pre>{`<!DOCTYPE html>`}</pre>
              <pre>{`<html lang="en">`}</pre>
              <pre>{`<head>`}</pre>
              <pre>{`<meta charset="UTF-8">`}</pre>
              <pre>{`<meta http-equiv="X-UA-Compatible" content="IE=edge">`}</pre>
              <pre>{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}</pre>
              <pre><strong>{"<script src='./webly.js'></script> " + " <!-- add this line -->"}</strong></pre>
              <pre>{`<title>Document</title>`}</pre>
              <pre>{`</head>`}</pre>
            </div>
            <div className="proyect_settings_download" onClick={handleDownload}>
              <SimCardDownloadIcon sx={{ color: '#bb64ff' }} />
              <label>Download webly.js</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
