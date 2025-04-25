import { BriefcaseBusiness, Calendar1, CircleUserRound, House } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./css/Sidebar.module.css";  

interface IProps {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <> 
      {isOpen && <div className={styles["overlay"]} onClick={onClose} />} 
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles["sidebar-header"]}>
          <h1 className={styles["title-side-bar"]}>WoldsHR</h1>
          <button className={styles["close-btn"]} onClick={onClose}>
            ×
          </button>
        </div>
        <ul className={styles["sidebar-menu"]}>          
          <li><NavLink to="/" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><House /><span>Home</span></NavLink></li> 
          <li><NavLink to="/employees" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><CircleUserRound /><span>Employees</span></NavLink></li>  
          <li><NavLink to="/employees-import" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}><CircleUserRound /><span>Employees (Import)</span></NavLink></li>    
          <li><NavLink to="/employment" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}> <Calendar1 /><span>Employment</span></NavLink></li>           
          <li><NavLink to="/jobs" className={({ isActive }) => `${styles["sidebarLink"]} ${isActive ? styles["active"] : ""}`}> <BriefcaseBusiness /><span>Jobs</span></NavLink></li>   
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;