import showContext from "../context/context.js";
import { useContext, useEffect } from "react";
import ControlContent from "../components/ControlContent.jsx";
import ControlUser from "../components/ControlUser.jsx";
import '../styles/dashboard.css'
export default function Dashboard() {
  const { setShowToolBar } = useContext(showContext)
  useEffect(() => {
    setShowToolBar(true);
  }, );


  return (
    <div className="dashboard">
      <ControlUser/>
      <ControlContent/>
    </div>
  );
}