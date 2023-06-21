
import { useState } from 'react';
import styles from './MyInput.module.css';

function MyInput({label="Placeholder", required=true, type="text", value, onChange = ()=>{}, onValidChanged=()=>{}}) {

  const [isValid, setIsValid] = useState(!required || (required&&value != ""));
  onValidChanged(isValid);
  function onInputChange(e){
    onChange(e.target.value);
    const newIsValid = !required || (required&&e.target.value != "")
    if(newIsValid!=isValid){
      setIsValid(newIsValid);
      onValidChanged(newIsValid);
    } 
  }

  return (
      <div className={styles.MyInput}>
        <div className={styles.label}>{label} {required && <span className={styles.req}>*</span>} </div>
        <input type={type} placeholder={label} value={value} onChange={onInputChange}></input>
      </div>
  );
}

export default MyInput;
