import { useEffect, useRef, useState } from "react";
import { Employee } from "../../../../types/employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import { setSelectedEmployee } from "../../employeeSlice";
import styles from "../../css/Employees-list.module.css"; 
import EmployeePopupForm from "../employeeForm/EmployeePopupForm";

type Props = {
  rows: Employee[];
  setShowEmployeePopForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEmployeePopForm: boolean; 
};  
  
const DataTable = ({ rows, setShowEmployeePopForm, showEmployeePopForm }: Props) => {

  const dispatch = useDispatch<AppDispatch>();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null); 
  const { employees, loading, error } = useSelector((state: RootState) => state.employeeList);  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRowClick = (employee: Employee) => { 
    dispatch(setSelectedEmployee(employee));
  };

  const handleEditClick = () => { 
    setShowEmployeePopForm(true);
    setOpenMenu(0);
  }

  const handleDeleteClick = (employeeId: number) => {
    setOpenMenu(0);
    alert(employeeId)
  }

  const handlePhotoClick = (employeeId: number) => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };
      
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  } 
  
  return (
    <table className={styles["employee-list-table"]}>
      <thead>
        <tr> 
          <th></th>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Hire Date</th>
          <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {employees.map((employee) => {           
          return (
            <tr key={employee.id} onClick={() => handleRowClick(employee)}>
              <td className={styles["employee-photo-cell"]}><img src={ employee.photo !== "" ? `/images/employees/${employee.photo}` : "/images/employees/default.png"} 
                  alt={`${employee.firstName} ${employee.surname}`} className={styles["circle-img"]} 
                  onError={(e) => {
                    e.currentTarget.src = "/images/employees/default.png";
                  }} onClick={() => handlePhotoClick(employee.id)} />

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
              </td>
              <td>{employee.id}</td>
              <td>{employee.firstName} {employee.surname}</td> 
              <td>{employee.department ? employee.department.name : ""}</td>
              <td><div><div className={styles["employee-phone-number"]}>{employee.phoneNumber}</div><div className={styles["employee-email"]}><a href={`mailto:${employee.email}`}>{employee.email}</a></div></div></td>
              <td>{employee.hireDate ? employee.hireDate : ""}</td> 
              <td className={`row ${openMenu === employee.id ? 'active' : ''}`}> 
                <div className={styles["employee-list-actions-menu-container"]}>  
                  <button onClick={() => setOpenMenu(openMenu === employee.id ? null : employee.id)} className={styles["employee-list-actions-menu-button"]}>
                    ⋮
                  </button>
                  {openMenu === employee.id && (
                    <div ref={menuRef} className={styles["employee-list-actions-menu"]}>
                      <div className={styles["employee-list-actions-menu-item"]} onClick={() => handleEditClick()}>Edit</div>
                      <div className={styles["employee-list-actions-menu-item"]} onClick={() => handleDeleteClick(employee.id)}>Delete</div>
                      {showEmployeePopForm && <EmployeePopupForm setShowEmployeePopForm={setShowEmployeePopForm} />}
                    </div>
                  )}
                </div>
              </td> 
            </tr>   
          );
        })}
      </tbody>
    </table>
  )
};
  
export default DataTable;