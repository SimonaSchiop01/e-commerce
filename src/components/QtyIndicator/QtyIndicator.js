
import { useState } from 'react';
import Button from '../Button/Button';
import styles from './QtyIndicator.module.css';

function QtyIndicator({initialQty, withBtns = false, onIncrement, onDecrement, onQtyChanged, minQ = 1, maxQ=Infinity}) {

  const [q, setQ] = useState(initialQty)

  return (
      <>
       {withBtns && <Button noBg={true} icon={"remove"} onClick={()=>{
        const newQ = q-1;
        if(newQ >= minQ) {
          setQ(newQ);
          //if(onIncrement) onIncrement();
          onDecrement && onDecrement();
          onQtyChanged && onQtyChanged(newQ);
        };
      }}></Button>}
       {q}
       {withBtns && <Button noBg={true} icon={"add"} onClick={()=>{
          const newQ = q+1;
          if(newQ <= maxQ) {
            setQ(newQ);
            //if(onIncrement) onIncrement();
            onIncrement && onIncrement();
            onQtyChanged && onQtyChanged(newQ);
          };
       }} ></Button>}
      </>
  );
}

export default QtyIndicator;
