import { useContext } from "react";
import Order from "../../components/Order/Order";
import { OrdersContext } from "../../contexts/OrdersContext/Orders.context";

import styles from './OrdersPage.module.css'


function OrdersPage() {

  const {getAllOrders} = useContext(OrdersContext);
  let orders = getAllOrders();
  
  return (
      <>
        <div className={styles.content}>
          <div className={styles.ordersList}>
            {orders && orders.map(o=><Order key={o.id} order={o}></Order>)}
            {!orders.length && (<div className={styles.noOrders}>Nu exista comenzi</div>)}

          </div>
        </div>
      </>
  );
}

export default OrdersPage;
