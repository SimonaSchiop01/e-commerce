import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import QtyIndicator from "../../components/QtyIndicator/QtyIndicator";
import { CartContext } from "../../contexts/CartContext/Cart.context";
import { OrdersContext } from "../../contexts/OrdersContext/Orders.context";

import styles from './CartPage.module.css'

function CartPage() {


  const {getCartItems, getCartItemsObj, removeProduct, emptyCart, incrementProductQty, decrementProductQty} = useContext(CartContext);
  const { createOrder } = useContext(OrdersContext);

  function sendOrder(info){
    createOrder(info, getCartItemsObj());
    emptyCart();
  }

  
  return (
      <>
        <div className={styles.title}>Cos de cumparaturi</div>
        { getCartItems().length>0 && <>

          <ProductsTable products={getCartItems()} onQuantityIncrement={(ci)=>{incrementProductQty(ci.product.id)}} onQuantityDecrement={(ci)=>{decrementProductQty(ci.product.id)}} onRemove={(ci)=>{removeProduct(ci.product.id)}}></ProductsTable>

          <div className={styles.btnHolder}>
            <Button className={styles.emptyCartBtn} text={"Goleste cosul"} onClick={()=>{emptyCart()}}></Button>
          </div>
          <CheckoutForm onSubmit={sendOrder}></CheckoutForm>

        </>}
        {getCartItems().length == 0 && <div className={styles.empty}>Nu exista produse in cos</div>}

        
      </>
  );
}

export default CartPage;
