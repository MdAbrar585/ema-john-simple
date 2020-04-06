import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('https://salty-depths-39455.herokuapp.com/products')
        .then(res=> res.json())
        .then(data=>{
            // console.log('data from database',data);
            setProducts(data);
            console.log(products);
        })
    },[])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                console.log(products);
                product.quantity = savedCart[existingKey];
                return product;
                // console.log(existingKey,savedCart[existingKey]);
            })
            setCart(previousCart);
            // console.log(previousCart);
        }
    }, [products])

    const handleAddProduct = (product) => {
        const toBeAddededKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddededKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddededKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // const count = sameProduct.length;
        // const newCart = [...cart, product];
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-Container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;