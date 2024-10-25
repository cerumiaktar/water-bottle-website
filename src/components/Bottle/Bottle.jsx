import PropTypes from 'prop-types';
import './Bottle.css'
// import React from 'react';

const Bottle = ({bottle, handleCartButton}) => {
    const {img, name, seller, price, stock} = bottle ;
    return (
        <div className="box">
            <img src={img} alt="" />
            <h4>{name}</h4>
            <p>Brand:{seller}</p>
            <p>Price:{price}</p>
            <p>Stock:{stock}</p>
            <button onClick={() => handleCartButton(bottle)}>Add to Cart</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleCartButton: PropTypes.func.isRequired
}
export default Bottle;