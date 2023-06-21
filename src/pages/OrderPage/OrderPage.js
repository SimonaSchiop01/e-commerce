import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import QtyIndicator from "../../components/QtyIndicator/QtyIndicator";
import { CartContext } from "../../contexts/CartContext/Cart.context";
import { OrdersContext } from "../../contexts/OrdersContext/Orders.context";
import { ProductsContext } from "../../contexts/ProductsContext/Products.context";

import styles from './OrderPage.module.css'

function OrderPage() {

  const {id} = useParams()

  const {getOrderByID} = useContext(OrdersContext);

  const order = getOrderByID(id);
  const orderProducts = Object.values(order.products);
  function formatDate(t){
    const d=new Date(t);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
  }
  const total = Object.values(order.products).reduce((acc, v)=>acc+(v.quantity*v.product.price),0)

  return (
      <>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.name}>{order.id}</div>
            <div className={styles.detail}> <span className={styles.detailName}>Plasata la: </span><span className={styles.detailValue}>{formatDate(order.createdAt)}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Nume: </span><span className={styles.detailValue}>{order.name}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Telefon: </span><span className={styles.detailValue}>{order.phone}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Email: </span><span className={styles.detailValue}>{order.email}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Adresa: </span><span className={styles.detailValue}>{order.address}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Status: </span><span className={styles.detailValue}>{order.status}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Livrare: </span><span className={styles.detailValue}>{order.delivery}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Plata: </span><span className={styles.detailValue}>{order.payment}</span> </div>
            <div className={styles.detail}> <span className={styles.detailName}>Total: </span><span className={styles.detailValue}>{total}</span> </div>

          </div>
        </div>
        <ProductsTable products={orderProducts}></ProductsTable>

      </>
  );
}

export default OrderPage;
