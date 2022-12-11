import ControlContent from "../components/ControlContent.jsx";
import ControlUser from "../components/ControlUser.jsx";
import '../styles/dashboard.css'
import { useState } from "react";
export default function Dashboard({token}) {
  const [newProyect, setNewProyect] = useState();
  return (
    <div className="dashboard">
      <ControlUser token={token} newProyect={newProyect}/>
      <ControlContent setNewProyect={setNewProyect}/>
    </div>
  );
}