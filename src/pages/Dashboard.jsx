import ControlContent from "../components/ControlContent.jsx";
import ControlUser from "../components/ControlUser.jsx";
import '../styles/dashboard.css'
export default function Dashboard({token}) {

  return (
    <div className="dashboard">
      <ControlUser token={token}/>
      <ControlContent/>
    </div>
  );
}