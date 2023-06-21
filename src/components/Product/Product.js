
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext/Cart.context';
import Button from '../Button/Button';
import styles from './Product.module.css';

function Product({product}) {
  
  const {id, name, photo, stock, price} = product;

  const {addProduct} = useContext(CartContext);

  const navigate = useNavigate()

  return (
      <>
      <div className={styles.productWrapper}>
        <div className={styles.product}>
            <img className={styles.photo} src={photo}></img>
            <div className={styles.info}>
              <div className={styles.name}>{name}</div>
              <div>
                <div className={`${styles.stock} ${stock && styles.inStock}`}>{stock?"In stoc":"Stoc epuizat"}</div>
                <div className={styles.price}>{price} lei</div>
              </div>
              <div className={styles.btns}>
                <Button text="Adauga in cos" disabled={!stock} onClick={()=>{addProduct(product)}}></Button>
                <Button text="Detalii produs" noBg={true} onClick={()=>{navigate(`/product/${id}`)}} ></Button>
              </div>
            </div>
        </div>
      </div>
      </>
  );
}

export default Product;
