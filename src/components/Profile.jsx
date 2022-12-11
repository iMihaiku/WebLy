import '../styles/profile.css';
import profile from '../media/user_icon.png'
import Icon from './Icon.jsx';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Profile() {
  const handleSettings = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <>
      <div className="profile_img">
        <img src={profile} alt="profile" />
      </div>
      <div className="profile_name">
        <h3>Nombre</h3>
        <h4>identificador</h4>
      </div>
      <div className="profile_config">
        <SettingsIcon fontSize="large" onClick={handleSettings}/>
      </div>
    </>
  )
}
