import Profile from "./Profile"
export default function ControlUser() {
  return (
    <div className="user_container">
      <div className="user_proyects">
        <div className="user_proyects_example"></div>
        <div className="user_proyects_example"></div>
      </div>
      <div className="user_profile">
        <div className="user_add_proyect"></div>
        <div className="user_settings">
          <Profile />
        </div>
      </div>
    </div>
  )
}
