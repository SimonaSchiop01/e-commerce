import React, { cloneElement, useContext, useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import firebaseApp from '../../utils/firebase';
import { AuthContext } from '../AuthContext/Auth.context';

export const WishlistContext = React.createContext({});

export function WishlistContextProvider({children}){

  const [wishlist, setWishlist] = useState({});

  const db=getFirestore(firebaseApp);

  const {getUserID} = useContext(AuthContext);

  useEffect(()=>{
    (async function(){
      const uid = getUserID();
      if(uid){
        const unsub = onSnapshot(collection(db, `Proiecte/magazin2/wishlist/${uid}/products`),(snaps)=>{
          const products = snaps.docs.map(doc => ({id: doc.id, ...doc.data()}));
          const productsObj = products.reduce((acc, v)=> ({...acc, [v.id]:v}), {})
          setWishlist(productsObj);
        })
  
        return ()=>{
          unsub()
        }
      }
      
      // const orders = (await getDocs(ordersCol)).docs.map(doc => ({id: doc.id, ...doc.data()}));
      // const orderObj = orders.reduce((acc, v)=> ({...acc, [v.id]:v}), {})
      // setOrders(orderObj);
    })();
  }, [getUserID()])
  

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

  const wishlistCtxValue = {
    addProduct: (product)=>{
      const uid= getUserID()
      if(uid){
        // addDoc(collection(db, `Proiecte/magazin2/wishlist/${uid}/products`), {
        //   product:product,
        // })
        setDoc(doc(db, `Proiecte/magazin2/wishlist/${uid}/products/${product.id}`), {
          product:product,
        },{merge:true})
      }

      // const wishlistCopy={...wishlist};
      // if(!(product.id in wishlistCopy)){
      //   wishlistCopy[product.id]={
      //     product:product,
      //     quantity:0
      //   }
      // }
      // wishlistCopy[product.id].quantity+=q;


      
      // setWishlist(wishlistCopy);
    },
    getWislistItems: ()=>{
      return Object.values(wishlist);
    },
    getWishlistItemsObj: ()=>{
      return wishlist;
    },
    getWishlistItemsCount:()=>{
      return Object.values(wishlist).reduce((acc, v)=>acc+v.quantity,0);
    },
    
    removeProduct:(productID)=>{
      const uid= getUserID()
      if(uid){
        deleteDoc(doc(db, `Proiecte/magazin2/wishlist/${uid}/products/${productID}`))
      }
      // const wishlistCopy = {...wishlist};
      // if(productID in wishlistCopy){
      //   delete wishlistCopy[productID];
      // }
      // setWishlist(wishlistCopy)
    },
    emptyWishlist: ()=>{
      const uid= getUserID()
      if(uid){
        for(const id in wishlist) {
          deleteDoc(doc(db, `Proiecte/magazin2/wishlist/${uid}/products/${id}`))
        }
      }
      //setWishlist({});
    }
  }

  return (
    <>
      <WishlistContext.Provider value={wishlistCtxValue}>{children}</WishlistContext.Provider>
    </>
  )
}