
import { useState } from 'react';
import Button from '../Button/Button';
import MyInput from '../MyInput/MyInput';
import styles from './CheckoutForm.module.css';

function CheckoutForm({onSubmit=()=>{}}) {

  const [nume, setNume]=useState("");
  const [prenume, setPrenume]=useState("");
  const [email, setEmail]=useState("");
  const [telefon, setTelefon]=useState("");
  const [adresa, setAdresa]=useState("");
  const [cui, setCui]=useState("");
  const [livrare, setLivrare]=useState();
  const [plata, setPlata]=useState();

  const [numeValid, setNumeValid]=useState(false);
  const [prenumeValid, setPrenumeValid]=useState(false);
  const [emailValid, setEmailValid]=useState(false);
  const [telefonValid, setTelefonValid]=useState(false);
  const [adresaValid, setAdresaValid]=useState(false);

  const [cuiValid, setCuiValid]=useState(false);


  const [dateFacturare, setDateFacturare]=useState(false);

  function submitForm(){
    onSubmit({
      nume, prenume, email, telefon, cui, livrare, plata, adresa
    });
  }


  const valid = numeValid && prenumeValid && emailValid && telefonValid && adresaValid && (!dateFacturare || dateFacturare && cuiValid) && livrare && plata;

  return (
      <>
        <div className={styles.title}>Date de livrare</div>

        <MyInput label='Nume' value={nume} onChange={(v)=>setNume(v)} onValidChanged={(v)=>{setNumeValid(v)}}></MyInput>
        <MyInput label='Prenume' value={prenume} onChange={(v)=>setPrenume(v)} onValidChanged={(v)=>{setPrenumeValid(v)}}></MyInput>
        <MyInput type="email" label='E-mail' value={email} onChange={(v)=>setEmail(v)} onValidChanged={(v)=>{setEmailValid(v)}}></MyInput>
        <MyInput type="tel" label='Telefon' required={true} value={telefon} onChange={(v)=>setTelefon(v)} onValidChanged={(v)=>{setTelefonValid(v)}}></MyInput>
        <MyInput type="text" label='Adresa' required={true} value={adresa} onChange={(v)=>setAdresa(v)} onValidChanged={(v)=>{setAdresaValid(v)}}></MyInput>

        <div className={styles.title}>Date de facturare</div>
        <div>
          <input type="checkbox" checked={dateFacturare} onChange={(e)=>{setDateFacturare(e.target.checked)}}></input>
          Afiseaza date de facturare
        </div>
        {dateFacturare &&
          <>
          <MyInput label='C.U.I.' value={cui} onChange={(v)=>setCui(v)} onValidChanged={(v)=>{setCuiValid(v)}}></MyInput>
          </>
        }


        <div className={styles.title}>Metoda de livrare</div>
        <div>
          <input type="radio" name="livrare" onChange={(e=>{setLivrare("cargus")})}></input>
          Curier - Urgent Cargus (2-3 zile lucratoare)
        </div>
        <div>
          <input type="radio" name="livrare"  onChange={(e=>{setLivrare("fan")})}></input>
          Curier - Fan Courier (3-5 zile lucratoare)
        </div>
        <div className={styles.title}>Metoda de plata</div>
        <div>
          <input type="radio" name="plata"  onChange={(e=>{setPlata("card")})}></input>
          Card online
        </div>
        <div>
          <input type="radio" name="plata" onChange={(e=>{setPlata("paypal")})}></input>
          PayPal
        </div>
        <div>
          <input type="radio" name="plata" onChange={(e=>{setPlata("numerar")})} ></input>
          Numerar la momentul primirii coletului
        </div>

        <Button disabled={!valid} onClick={submitForm} text="Trimite comanda"></Button>
      </>
  );
}

export default CheckoutForm;
