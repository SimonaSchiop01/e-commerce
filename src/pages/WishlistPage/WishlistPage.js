import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import { WishlistContext } from "../../contexts/WishlistContext/Wishlist.context";

import styles from './WishlistPage.module.css'

function WishlistPage() {


  const {getWislistItems,removeProduct,emptyWishlist} = useContext(WishlistContext);

  const products = getWislistItems();

  return (
      <>
        {products.length!=0 && <>
          <div className={styles.header}>
            <div className={styles.info}>
              <div className={styles.name}>Wishlist</div>
            </div>
          </div>
          <ProductsTable products={products} withQuantity={false} onRemove={(product)=>{removeProduct(product.product.id)}}></ProductsTable>
          <div className={styles.btnHolder}>
            <Button text="Goleste Wishlit" onClick={()=>{emptyWishlist()}}></Button>
          </div>
        </>}
        {products.length==0 && <>
          <div className={styles.empty}>Nu exista produse in wishlist</div>
        </>}
      </>
  );
}

export default WishlistPage;
