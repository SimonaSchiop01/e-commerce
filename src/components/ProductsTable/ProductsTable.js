
import Button from '../Button/Button';
import QtyIndicator from '../QtyIndicator/QtyIndicator';
import styles from './ProductsTable.module.css';

function ProductsTable({products=[], onQuantityIncrement, onQuantityDecrement, onRemove, withQuantity=true}) {
  return (
      <>
        <table>
            <tr className={styles.tableHeader}>
              <th>Imagine</th>
              <th>Produs</th>
              <th>Pret unitar</th>
              {withQuantity && <th>Cantitate</th>}
              {onRemove && <th>Sterge</th>}
            </tr>

            {products.map(ci=>(
              <tr key={ci.product.id}>
                <td>
                  <img src={ci.product.photo}></img>
                </td>
                <td>{ci.product.name}</td>
                <td>{ci.product.price} lei</td>
                {withQuantity && <td><QtyIndicator withBtns={onQuantityDecrement && onQuantityIncrement} initialQty={ci.quantity} minQ={0} maxQ={ci.product.stock} onIncrement={()=>{onQuantityIncrement(ci)}} onDecrement={()=>{onQuantityDecrement(ci)}}></QtyIndicator></td>}
                {onRemove && <td>
                  <Button noBg={true} icon={"close"} onClick={()=>{onRemove(ci)}}></Button>
                </td>}
              </tr>
            ))}
          </table>
      </>
  );
}

export default ProductsTable;
