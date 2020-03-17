import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const { name, quantity } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        marginLeft: '200px',
        paddingBottom: '5px',
    }
    return (
        <div style={reviewItemStyle}>
            <h5 className="product-name">{name}</h5>
            <p>Quantity : {quantity}</p><br/>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;