
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/Auth.context';
import { PopupContext } from '../../contexts/PopupContext/Popup.context';
import Button from '../Button/Button';
import MyInput from '../MyInput/MyInput';
import styles from './AuthPopup.module.css';

function AuthPopup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [showCreate, setShowCreate] = useState(false);

  const {isPopupOpen, closePopup} = useContext(PopupContext);
  const {signIn,getUserID, createAccount} = useContext(AuthContext);

  useEffect(()=>{
    if(getUserID()){
      closePopup()
    }
  },[getUserID()])



  return (
      <>
      {isPopupOpen()&&<>
        <div className={styles.backdrop} onClick={()=>{closePopup()}}></div>
        <div className={styles.popup}>
          {showCreate&&<>
          <div className={styles.title}>Sunt client nou</div>
          <div className={styles.field}>
            <MyInput type='email' label="Email" required={true} onChange={(v)=>{setEmail(v)}}></MyInput>
            <MyInput type='password' label='Parola' required={true} onChange={(v)=>{setPassword(v)}}></MyInput>
            <MyInput type='password' label='Repeta parola' required={true} onChange={(v)=>{setPassword2(v)}}></MyInput>

            <Button text="Creeaza cont" fullWidth={true} onClick={()=>{
              if(password == password2) {
                createAccount(email, password)
              }
            }}></Button>
            <Button text="Am deja cont" fullWidth={true} noBg={true} onClick={()=>{setShowCreate(false)}}></Button>
          </div>
          </>}

          {!showCreate && <>
          <div className={styles.title}>Sunt deja client</div>
          <div className={styles.field}>
            <MyInput type='email' label="Email" required={true} onChange={(v)=>{setEmail(v)}}></MyInput>
            <MyInput type='password' label='Parola' required={true} onChange={(v)=>{setPassword(v)}}></MyInput>
            <Button text="Log in" fullWidth={true} onClick={()=>{signIn(email, password)}}></Button>
            <Button text="Sunt client nou" fullWidth={true} noBg={true} onClick={()=>{setShowCreate(true)}}></Button>

          </div>
          </>}
        </div>
      </>}
        
      </>
  );
}

export default AuthPopup;
