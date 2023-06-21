import React, { useState } from 'react'

export const CartContext = React.createContext({});

export function CartContextProvider({children}){

  const [cart, setCart] = useState({});

  // const cart={
  //   a:{
  //     product:{name, pret, stoc, ...},
  //     quantity:3
  //   },
  //   b:{
  //     product:{},
  //     quantity:1
  //   },
  // }

  const cartCtxValue = {
    addProduct: (product, q=1)=>{
      const cartCopy={...cart};
      //const cartCopy=Object.assign({},cart);
      // if(product.id in cartCopy){
      //   cartCopy[product.id].quantity+=q;
      // } else {
      //   cartCopy[product.id]={
      //     product:product,
      //     quantity:q
      //   }
      // }
      if(!(product.id in cartCopy)){
        cartCopy[product.id]={
          product:product,
          quantity:0
        }
      }
      cartCopy[product.id].quantity+=q;
      if(cartCopy[product.id].quantity>cartCopy[product.id].product.stock){
        cartCopy[product.id].quantity=cartCopy[product.id].product.stock
      }
      setCart(cartCopy);
      // setCart({
      //   ...cart,
      //   [product.id]:{
      //     product,
      //     quantity: (cart[product.id]?cart[product.id].quantity:0)+1
      //   }
      // })
    },
    getCartItems: ()=>{
      return Object.values(cart);
    },
    getCartItemsObj: ()=>{
      return cart;
    },
    getCartItemsCount:()=>{
      // const vals = Object.values(cart);
      // const q=0;
      // for(const v of vals){
      //   q+=v.quantity;
      // }
      // return q;
      return Object.values(cart).reduce((acc, v)=>acc+v.quantity,0);
    },
    incrementProductQty:(productID)=>{
      const cartCopy={...cart};
      if(productID in cartCopy){
        cartCopy[productID].quantity++;
        if(cartCopy[productID].quantity>cartCopy[productID].product.stock){
          cartCopy[productID].quantity=cartCopy[productID].product.stock
        }
      }
      setCart(cartCopy);
    },
    decrementProductQty:(productID)=>{
      const cartCopy={...cart};
      if(productID in cartCopy){
        cartCopy[productID].quantity--;
      }
      if(cartCopy[productID].quantity==0){
        delete cartCopy[productID];
      }
      setCart(cartCopy);
    },
    removeProduct:(productID)=>{
      const cartCopy = {...cart};
      if(productID in cartCopy){
        delete cartCopy[productID];
      }
      setCart(cartCopy)
    },
    emptyCart: ()=>{
      setCart({});
    }
  }

  return (
    <>
      <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>
    </>
  )
}