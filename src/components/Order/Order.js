
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Order.module.css';

function Order({order}) {
  
  const {id, name,createdAt, products} = order;

  const navigate = useNavigate()

  function formatDate(t){
    const d=new Date(t);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
  }


  const total = Object.values(products).reduce((acc, v)=>acc+(v.quantity*v.product.price),0)

  
  return (
      <>
      <div className={styles.orderWrapper}>
        <div className={styles.order}>
            <div className={styles.info}>
              <div className={styles.name}>{id}</div>
              <div className={styles.name}>{name}</div>
              <div>{formatDate(createdAt)}</div>
              <div>Total: {total}</div>

              <div className={styles.btns}>
                <Button text="Detalii comanda" noBg={true} onClick={()=>{navigate(`/order/${id}`)}} ></Button>
              </div>
            </div>
        </div>
      </div>
      </>
  );
}

export default Order;
