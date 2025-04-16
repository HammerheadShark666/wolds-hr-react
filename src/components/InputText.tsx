'use client'

import { Controller } from "react-hook-form";
import styles from "./Input.module.css"
 
interface IProps {  
  name: string;
  label: string;
  control: any;
  error: any;
} 

const InputText = ({ name, control, label, error }: IProps) => {
 
  return (
    <div className={styles["row-container"]}>
      <div className={styles["row"]}>
        <label htmlFor={name} className={styles["label"]}>{label}:</label>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className={styles["text"]}>
              <input
                {...field}
                type="text"
                className={styles["text"]}
                id={name}
                placeholder={`${label}...`}
              />
            </div>
          )}
        />
      </div> 
      <div className={styles["row"]}> 
        {error && <span className={styles["error"]}>{error.message}</span>}
      </div>
    </div> 
  )       
} 

export default InputText;