import React from "react";
import EmployeeAddUpdate from "./EmployeeAddUpdate";
import styles from "../../../employee/css/Employee-form.module.css";

interface IProps {
  setShowEmployeePopUpForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupForm: React.FC<IProps> = ({ setShowEmployeePopUpForm }) => {

  return (
    <div className={styles["overlay"]}>
      <div className={styles["popup"]}> 
        <EmployeeAddUpdate setShowEmployeePopUpForm={setShowEmployeePopUpForm} ></EmployeeAddUpdate> 
      </div>
    </div>
  );
}; 

export default PopupForm;