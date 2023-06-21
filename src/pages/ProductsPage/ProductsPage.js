import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import Product from "../../components/Product/Product";
import { ProductsContext } from "../../contexts/ProductsContext/Products.context";

import styles from './ProductsPage.module.css'

function compare(productValue, rule){
  switch(rule.type){
    case "==":
      return productValue==rule.value;
    case "betwen":
      return productValue>rule.min && productValue<rule.max;
    // case "in":
    //   return rule.values.includes(productValue)
    default:
      return false;
  }
}

function ProductsPage() {

  const {category} = useParams()

  const {getProductsByCategory} = useContext(ProductsContext);
  let products = getProductsByCategory(category);

  const [sortDirection, setSortDirection]= useState("");
  const [filterConditions, setFilterConditions]= useState({
    //plating: "aur",
    //stone: "diamant",
    // price: {
    //   type: "betwen",
    //   min:100,
    //   max:200
    // },
    // plating:{
    //   type: "==",
    //   value: "aur"
    // },
    // plating: {
    //   type: "in",
    //   values: ["aur", "argint"]
    // }
  });



  if(Object.keys(filterConditions).length!=0){
    products = products.filter(p=>{
      for(const cK in filterConditions){
        // if(p[cK]!=filterConditions[cK]){
        //   return false;
        // }
        if(!compare(p[cK], filterConditions[cK])){
          return false;
        }
      }
      return true;

      //return Object.keys(filterConditions).every(cK=>p[cK]=filterConditions[cK])
      
    })
  }

  products.sort((a,b)=>{
    if(sortDirection=="asc") return a.price-b.price;
    if(sortDirection=="desc") return b.price-a.price;
  })

  const sortingOptions = {
    asc: {
      name: "Sorteaza crescator dupa pret",
      onSelect: ()=>{
        setSortDirection("asc")
      } 
    },
    desc: {
      name: "Sorteaza descrescator dupa pret",
      onSelect: ()=>{
        setSortDirection("desc")
      } 
    }
  }
  
  const filterCriterias={
    price:{
      name: "PRET",
      options: [
        {
          name: "0lei - 100lei",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              price: {
                type: "betwen",
                min:0,
                max:100
              }
            })
          }
        },
        {
          name: "101lei - 200lei",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              price: {
                type: "betwen",
                min:101,
                max:200
              }
            })
          }
        },
        {
          name: "201lei - 300lei",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              price: {
                type: "betwen",
                min:201,
                max:300
              }
            })
          }
        },
        {
          name: "300lei si peste",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              price: {
                type: "betwen",
                min:300,
                max:Infinity
              }
            })
          }
        },
      ]
    },
    plating: {
      name: "PLACARE",
      options: [
        {
          name: "aur",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              plating: {
                type: "==",
                value:"aur"
              }
            })
    
          }
        },
        {
          name: "argint",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              plating: {
                type: "==",
                value:"argint"
              }
            })
          }
        },
      ]
    },
    stone: {
      name: "PIATRA",
      options: [
        {
          name: "Diamant",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              stone: {
                type: "==",
                value:"diamant"
              }
            })
          }
        },
        {
          name: "Perla",
          onSelect: ()=>{
            setFilterConditions({
              ...filterConditions,
              stone: {
                type: "==",
                value:"perla"
              }
            })
          }
        },
      ]
    }
  }

  return (
      <>
        <div className={styles.content}>
          <Filters sortingOptions={sortingOptions} filterCriterias={filterCriterias}></Filters>
          <div className={styles.productsList}>
            {products && products.map(p=><Product key={p.id} product={p}></Product>)}
            {!products.length && (<div className={styles.noProducts}>Nu exista produse din categoria "{category}"</div>)}

          </div>
        </div>
      </>
  );
}

export default ProductsPage;
