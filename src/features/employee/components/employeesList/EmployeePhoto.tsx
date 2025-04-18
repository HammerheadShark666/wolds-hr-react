import { useRef, useState } from "react";
import { Employee } from "../../../../types/employee";
import { AppDispatch, RootState } from "../../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeePhoto } from "../../employeeThunks";
import styles from "../../css/Employees-list.module.css"; 
import { getEmployeePhotoUrl } from "../../../../helpers/imageHelper";
import PopupMessage from "../../../../components/PopupMessage";

interface IProps {
  employee: Employee; 
};

const EmployeePhoto = ({ employee }: IProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);  
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const handlePhotoClick = (employeeId: number) => {
    fileInputRef.current?.click();
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (file) {        
      if(selectedEmployee?.id)
        dispatch(updateEmployeePhoto({ id: selectedEmployee?.id, file}));
      else 
      {
        setMessage('Employee not selected.');
        setShowPopup(true);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <img src={`${getEmployeePhotoUrl(employee.photo)}`} 
        alt={`${employee.firstName} ${employee.surname}`} className={styles["circle-img"]} 
        onError={(e) => {

          const fallbackUrl = '/images/employees/default.png'; // Make sure this exists in your public folder
          if (e.currentTarget.src !== window.location.origin + fallbackUrl) {
            e.currentTarget.src = fallbackUrl;
          } 
        }} onClick={() => handlePhotoClick(employee.id)} />
      <input
        type="file"
        ref={fileInputRef} 
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />    
      {showPopup && <PopupMessage message={message} onClose={handleClosePopup} />}
    </>
  )
}

export default EmployeePhoto;