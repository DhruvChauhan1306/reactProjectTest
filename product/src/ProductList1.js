import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList1(){

    const [products,setProducts]=useState([]);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);
    const [searchTerm,setSearchTerm]=useState('');
    const [selectedCategory,setSelectedCategory]=useState('')
    const [categories,setCategories]=useState('');

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then((res)=>res.json())
        .then((data)=>{
            console.log("data:-",data);
            setProducts(data);
            setLoading(false);
        },
        (error)=>{
            setError(error);
            setLoading(false);
        }
    );  

        fetch('https://fakestoreapi.com/products/categories')
            .then((res)=>res.json())
            .then((data)=>setCategories(data));
    },[])

    const filteredProducts=products.filter((product)=>{
        return(
            product.title.toLowerCase().includes(searchTerm.toLowerCase())&&
            (selectedCategory?product.category===selectedCategory:true)
        );
    });

    if(loading) return <p>Loading products...</p>;
    if(error) return <p>Error loading product:{error.message}</p>

    return(
        <>
        <div>Products</div>
        <input type="text"
        placeholder="Search products..."
        onChange={(e)=>setSearchTerm(e.target.value)}>
        </input>
        <br/>
        <select onChange={(e)=>setSelectedCategory(e.target.value)}>
            <option value="">all categories
            </option>
            {categories.map((catagory)=>(
                <option key={catagory} value={catagory}>
                    {catagory}
                </option>
            )
            )}

        </select> 
        <div>
            {filteredProducts.map((product)=>(
                <div key={product.id}>
                    <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} width="100"/>
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                    </Link>
                </div>
            ))

            }
        </div>  
        </>
    )
}

export default ProductList1;


