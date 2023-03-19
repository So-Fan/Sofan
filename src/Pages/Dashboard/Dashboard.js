import React, {useState} from 'react'
import DashboardSubMenu from '../../Components/DashboardSubMenu/DashboardSubMenu'
import "./Dashboard.css"
function Dashboard() {
  const [isSubMenuClicked, setIsSubMenuClicked] = useState([
    true,
    false,
    false,
  ]);
  return (
    <section className='dashboard-page-container'>
      <DashboardSubMenu
      setIsSubMenuClicked={setIsSubMenuClicked}
      isSubMenuClicked={isSubMenuClicked}
      />
    </section>
  )
}

export default Dashboard