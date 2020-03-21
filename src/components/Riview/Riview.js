import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Riview.css'
import Cart from '../Cart/Cart';
import orderDoneImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../LogIn/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        // console.log("clicked",productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
            // cart
            const savedCart = getDatabaseCart();
            const productKeys = Object.keys(savedCart);
            const cartProducts = productKeys.map(key => {
                const product = fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;

            });
            //  console.log(cartProducts);
            setCart(cartProducts);
    },[])

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={orderDoneImage} alt=""/>
    }
    return (
        <div className="review-container">
            <div className="reviewProduct-container">
            {
            cart.map(pd => <ReviewItem
                key = {pd.key}
                removeProduct = {removeProduct}
                product={pd}></ReviewItem> )
            }
            {
                thankyou
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