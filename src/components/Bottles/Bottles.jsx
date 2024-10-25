// import React from 'react';
import './Bottles.css'

import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import { addToLS, getStoreCart, removeFromLS } from '../../utilities/localstorage';
import Cart from '../Cart/Cart';

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    // Load cart from local storage
    useEffect(() => {
        console.log(bottles.length)
        if (bottles.length) {
            const storeCart = getStoreCart();
            console.log(storeCart, bottles);
            const saveCart = [];
            for(const id of storeCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            console.log("saved cart", saveCart);
            setCart(saveCart)

        }
    }, [bottles])

    const handleCartButton = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        // visual cart remove

        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        // remove from LS
        removeFromLS(id);

    }

    return (
        <div>
            <h2>Bottles Here:{bottles.length}</h2>
            <Cart cart = {cart} handleRemoveFromCart = {handleRemoveFromCart} ></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleCartButton={handleCartButton}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;