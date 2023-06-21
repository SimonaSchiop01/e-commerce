import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import QtyIndicator from "../../components/QtyIndicator/QtyIndicator";
import { CartContext } from "../../contexts/CartContext/Cart.context";
import { ProductsContext } from "../../contexts/ProductsContext/Products.context";
import { WishlistContext } from "../../contexts/WishlistContext/Wishlist.context";

import styles from './ProductPage.module.css'

function ProductPage() {

  const {id} = useParams()

  const [crtSection, setCrtSection] = useState("Descriere");


  const sections=[
    {
      name: "Descriere",
      content:"Produsul vine insotit de certificat de garantie, valabil 1 an de la data achizitiei. De asemenea, veti primi gratuit si cutiuta de cadou premium in care produsul dumneavoastra va fi ambalat cu multa grija."
    },
    {
      name: "Recenzii",
      content: "RECENZII"
    },
    {
      name: "Comentarii",
      content: "Acestea sunt comentarii"
    }
  ]


  const {addProduct:addProductToWishlist} = useContext(WishlistContext);
  const {getProductByID} = useContext(ProductsContext);
  const {addProduct} = useContext(CartContext);
  const product = getProductByID(id);

  const [lastQ, setLastQ] =useState(1);

  return (
      <>
        <div className={styles.header}>
          <img className={styles.photo} src={product.photo}/>
          <div className={styles.info}>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.stock}>Disponibilitate: <span className={`${styles.stockStatus} ${product.stock && styles.inStock}`}>{product.stock?"In stoc":"Stoc epuizat"}</span></div>
            <div className={styles.price}>{product.price} lei</div>
            <div className={styles.quantity}>Cantitate: {product.stock} produse disponibile in stoc</div>
            <div className={styles.btns}>
              <Button icon="favorite" noBg={true} onClick={()=>{addProductToWishlist(product)}}></Button>
              <QtyIndicator initialQty={1} maxQ={product.stock} withBtns={true} onQtyChanged={(q)=>{setLastQ(q)}}></QtyIndicator>
              <Button text="Adauga in cos" disabled={!product.stock} onClick={()=>{addProduct(product,lastQ)}}></Button>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.tabs}>
            {sections.map(s=>(<div className={`${styles.tab} ${s.name == crtSection && styles.active}`} onClick={()=>{setCrtSection(s.name)}}>{s.name}</div>))}
          </div>
          <div className={styles.sections}>
            {sections.map(s=>(
              crtSection==s.name && <div className={styles.section}>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </>
  );
}

export default ProductPage;
