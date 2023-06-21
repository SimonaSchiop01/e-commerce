import React, { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import firebaseApp from '../../utils/firebase';

export const OrdersContext = React.createContext({});

export function OrdersContextProvider({children}){

  const [orders, setOrders]=useState({
    // c1:{
    //   id: "c1",
    //   createdAt:"",
    //   status: "",
    //   email: "test@a.com",
    //   name: "Test Ion",
    //   products: [
    //     //Aceaisi structura ca la cos (cart.context.js)
    //   ],
    //   address:"Bucuresti",
    //   phone: "0712345678",
    //   delivery: "cargus",
    //   payment: "card"
    // }
  })

  const db=getFirestore(firebaseApp);

  const ordersCol = collection(db, "Proiecte/magazin2/comenzi")

  useEffect(()=>{
    (async function(){
      onSnapshot(ordersCol,(snaps)=>{
        const orders = snaps.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const orderObj = orders.reduce((acc, v)=> ({...acc, [v.id]:v}), {})
        setOrders(orderObj);
      })
      // const orders = (await getDocs(ordersCol)).docs.map(doc => ({id: doc.id, ...doc.data()}));
      // const orderObj = orders.reduce((acc, v)=> ({...acc, [v.id]:v}), {})
      // setOrders(orderObj);
    })();
  }, [])
  
  const ordersCtxValue = {
    createOrder:(info, products)=>{
      addDoc(ordersCol,{
        createdAt: Date.now(),
        status: "Plasata",
        email: info.email,
        name: `${info.nume} ${info.prenume}`,
        products: products,
        address: info.adresa,
        phone: info.telefon,
        delivery: info.livrare,
        payment: info.plata
      })
      // setOrders({
      //   ...orders,
      //   [info.telefon]:{
      //     id: info.telefon,
      //     createdAt: Date.now(),
      //     status: "Plasata",
      //     email: info.email,
      //     name: `${info.nume} ${info.prenume}`,
      //     products: products,
      //     address: info.adresa,
      //     phone: info.telefon,
      //     delivery: info.livrare,
      //     payment: info.plata
      //   }
      // })
    },
    getAllOrders: ()=>{
      return Object.values(orders);
    },
    getOrderByID: (id)=>{
      return orders[id];
    }
  }
  

  return (
    <>
      <OrdersContext.Provider value={ordersCtxValue}>{children}</OrdersContext.Provider>
    </>
  )
}