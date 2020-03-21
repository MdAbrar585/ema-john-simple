import React from 'react';
import { useForm} from 'react-hook-form';
import './Shipping.css'
import { useAuth } from '../LogIn/useAuth';

const Shipping = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();

    return (
        <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name"/>
            {errors.name && <span>Name field is required</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
            {errors.email && <span>Email field is required</span>}

            <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
            {errors.addressLine1 && <span>Address field is required</span>}

            <input name="addressLine2" ref={register} placeholder="Address Line 2"/>

            <input name="city" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span>City field is required</span>}

            <input name="country" ref={register({ required: true })} placeholder="Country"/>
            {errors.country && <span>Country field is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="ZipCode" />
            {errors.zipcode && <span>Zipcode field is required</span>}

            <input type="submit" />
        </form>
    )
};

export default Shipping;