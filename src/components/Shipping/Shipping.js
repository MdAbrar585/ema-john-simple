import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipping.css'
import { useAuth } from '../LogIn/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipping = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shippingInfo, setShippingInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_VX7COehSNQtC4I6sU5jNXeRQ00r42EFsBl');

    const onSubmit = data => {
        setShippingInfo(data);
    }
    const handlePlaceOrder = (payment) => {
        const saveCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: saveCart,
            shipment: shippingInfo,
            payment: payment
        };
        fetch('https://salty-depths-39455.herokuapp.com/placeOrder', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(order => {
                //clear local storage cart
                setOrderId(order._id);
                clearLocalShoppingCart();

            })
    }

    return (

        <div className="row">
            <div style={{ display: shippingInfo && 'none' }} className="col-md-6">
                <h3>Shipping Information</h3>
                <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
                    {errors.name && <span>Name field is required</span>}

                    <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
                    {errors.email && <span>Email field is required</span>}

                    <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
                    {errors.addressLine1 && <span>Address field is required</span>}

                    <input name="addressLine2" ref={register} placeholder="Address Line 2" />

                    <input name="city" ref={register({ required: true })} placeholder="City" />
                    {errors.city && <span>City field is required</span>}

                    <input name="country" ref={register({ required: true })} placeholder="Country" />
                    {errors.country && <span>Country field is required</span>}

                    <input name="zipcode" ref={register({ required: true })} placeholder="ZipCode" />
                    {errors.zipcode && <span>Zipcode field is required</span>}

                    <input type="submit" />
                </form>
            </div>
            <div style={{ display: shippingInfo ? 'block' : 'none' }} className="col-md-6">
                <h3>Payment Information</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                </Elements>
                <br />
                {
                    orderId &&
                    <div>
                        <h3>Thankyou For Shopping With Us</h3>
                        <p>Your order id is: {orderId}</p>
                    </div>
                }
            </div>
        </div>

    )
};

export default Shipping;