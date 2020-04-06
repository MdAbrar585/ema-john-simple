import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    console.log(product);
    
    useEffect(()=>{
        fetch('https://salty-depths-39455.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    },[productKey]);
    return (
        <div>
            <h1>{productKey} Comming Soon............</h1>
            {
               product && <Product showAddToCart={false} product={product}></Product>}
        </div>
    );
};

export default ProductDetails;