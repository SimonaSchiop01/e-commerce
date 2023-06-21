import React, { useState } from 'react'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react';
import firebaseApp from '../../utils/firebase';

export const ProductsContext = React.createContext({});

export function ProductsContextProvider({children}){

  const [products, setProducts]=useState({})

  const db=getFirestore(firebaseApp);

  const productsCol = collection(db, "Proiecte/magazin2/produse")

  useEffect(()=>{
    (async function(){
      const products = (await getDocs(productsCol)).docs.map(doc => ({id: doc.id, ...doc.data()}));
      const productsObj = products.reduce((acc, v)=> ({...acc, [v.id]:v}), {})
      setProducts(productsObj);

    })();
  }, [])

  // Promise.all(Object.values({
  //   a:{
  //     id: "a",
  //     name: "Cercei cu diamant",
  //     stock:4,
  //     photo: "https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/philippe-van-doninck-7IUKOXTVPEg-unsplash.jpg?alt=media&token=ba26c6ad-2d37-4c56-8cfd-1d990add4b36",
  //     price: 345.0,
  //     plating: "argint",
  //     stone: "diamant",
  //     category: "cercei"
  //   },
  //   b: {
  //     id: "b",
  //     name: "Bratara cu perle",
  //     stock: 6,
  //     photo: "https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/pexels-photo-1395305.jpeg?alt=media&token=2e9c8bda-c06e-471b-a32b-2662067fa593",
  //     price: 129.99,
  //     plating: "aur",
  //     stone: "perla",
  //     category: "cercei"
  //   }
  // }).map(p=>{
  //   return setDoc(doc(db, `Proiecte/magazin2/produse/${p.id}`),p);
  // }))


  // const products = {
  //   a:{
  //     id: "a",
  //     name: "Cercei cu diamant",
  //     stock:4,
  //     photo: "https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/philippe-van-doninck-7IUKOXTVPEg-unsplash.jpg?alt=media&token=ba26c6ad-2d37-4c56-8cfd-1d990add4b36",
  //     price: 345.0,
  //     plating: "argint",
  //     stone: "diamant",
  //     category: "cercei"
  //   },
  //   b: {
  //     id: "b",
  //     name: "Bratara cu perle",
  //     stock: 6,
  //     photo: "https://firebasestorage.googleapis.com/v0/b/magazinvirtual-8ddcf.appspot.com/o/pexels-photo-1395305.jpeg?alt=media&token=2e9c8bda-c06e-471b-a32b-2662067fa593",
  //     price: 129.99,
  //     plating: "aur",
  //     stone: "perla",
  //     category: "cercei"
  //   }
  // }

  // const productsCtxValue = {
  //   getAllProducts: ()=>Object.values(products),
  //   getProductByID: (id)=>products[id],
  //   getProductsByCategory: (category)=>Object.values(products).filter(p=>p.category==category)
  // }
  
  const productsCtxValue = {
    getAllProducts: ()=>Object.values(products),
    getProductByID: (id)=>products[id],
    getProductsByCategory: (category)=>Object.values(products).filter(p=>p.category==category)
  }

  return (
    <>
      <ProductsContext.Provider value={productsCtxValue}>{children}</ProductsContext.Provider>
    </>
  )
}