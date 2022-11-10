import '../styles/profile.css';
import profile from '../media/logo_transparent_mini.png'
export default function Profile() {
  return (
    <>
      <div className="profile_img">
        <img src={profile} alt="profile" />
      </div>
      <div className="profile_name">nombre</div>
      <div className="profile_config">ruletita</div>
    </>
  )
}
