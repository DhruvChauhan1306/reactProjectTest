import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail1(){
        const {id}=useParams();
       const [product,setProduct]=useState([]);
        const [error,setError]=useState("");
        const [loading,setLoading]=useState(true);

        useEffect(()=>{
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res)=>res.json())
             .then((data)=>{
                 console.log("data:-",data);
                 setProduct(data);
                 setLoading(false);
             },
             (error)=>{
                 setError(error);
                 setLoading(false);
             }
         );                 
         },[]);

         if(loading) return <p>Loading</p>
         if(error) return <p>error occures:{error.message}</p>
        return(
            <div>
                <h1>{product.title}</h1>
                <img src={product.image} alt={product.title} width="200"/>
                <p>price:${product.price}</p>
                <p>{product.description}</p>
                <p>Rating:{product.rating.rate}({product.rating.count} reviews)</p>
            </div>            
        )
}

export default ProductDetail1;
