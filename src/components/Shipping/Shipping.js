import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipping.css'
import { useAuth } from '../LogIn/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipping = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_VX7COehSNQtC4I6sU5jNXeRQ00r42EFsBl');

    const onSubmit = data => {
        const saveCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: saveCart,
            shipment: data
        };
        fetch('http://localhost:4200/placeOrder', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(order => {
                alert("Successfully Ordered Your Order id" + order._id);
                processOrder();
            })
    }

    return (

        <div className="row">
            <div className="col-md-6">
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
            <div className="col-md-6">
                <h3>Payment Information</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>

    )
};

export default Shipping;