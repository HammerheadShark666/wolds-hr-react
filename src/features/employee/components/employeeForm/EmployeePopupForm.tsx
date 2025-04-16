import React from "react";
import EmployeeAddUpdate from "./EmployeeAddUpdate";
import styles from "../../../employee/css/Employee-form.module.css";

interface IProps {
  setShowEmployeePopForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupForm: React.FC<IProps> = ({ setShowEmployeePopForm }) => {

  return (
    <div className={styles["overlay"]}>
      <div className={styles["popup"]}> 
        <EmployeeAddUpdate setShowEmployeePopForm={setShowEmployeePopForm} ></EmployeeAddUpdate> 
      </div>
    </div>
  );
}; 

export default PopupForm;