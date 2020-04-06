import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Riview.css'
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();


    const removeProduct = (productKeys) => {
        // console.log("clicked",productKey);
        const newCart = cart.filter(pd => pd.key !== productKeys);
        setCart(newCart);
        removeFromDatabaseCart(productKeys);
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://salty-depths-39455.herokuapp.com/getProductsByKey', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                //  console.log(cartProducts);
                setCart(cartProducts);
                })



           
    }, [])

    return (
        <div className="review-container">
            <div className="reviewProduct-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    !cart.length && <h1>Cart Is Empty!!!!!!! <a href="/shop"> Keep Shoping....</a></h1>
                }
            </div>
            <div className="reviewCart-container">
                <Cart cart={cart}>
                    <Link to="/shipping">
                        {
                            auth.user ? <button className="main-button">Proceed Shipment</button> :
                                <button className="main-button">Login to Proceed</button>}
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;