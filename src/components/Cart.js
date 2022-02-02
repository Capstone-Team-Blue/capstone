import React, { useState, useEffect } from 'react'
import { checkout, getUserCart } from '../api'
import SingleCart from './SingleCart'

const Cart = (props) => {
    const { loginToken } = props
    const [ cart, setCart ] = useState([])
    let total = 0

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
            }
        }
        getCurrentCart(loginToken)
    }, [loginToken, total])

    function getTotalCost(total){
        if(cart.length){
            cart.map((el) => {
                total = total + el.quantity*el.unitCost
            })
            return total = total/100
        }
    }

    total = getTotalCost(total)

    return (
        <div id='cart'>
            <h1>Your Cart</h1>

            { cart.length ? cart.map((el, index) => (
                <SingleCart key={index} cart={cart} setCart={setCart} loginToken={loginToken} el={el} index={index}/>
            )) : null }

            {cart.length ?
            <div id='totalCost'>
                <h4>Cart Total:</h4>
                <p>$ {total}</p>
            </div>
            : null}
            {cart.length ? 
            <button type='button' id='checkout' onClick={async () => {
                await checkout(cart[0].orderId, loginToken)
                setCart(await getUserCart(loginToken))
                alert('cart checked out!')
            }}>checkout</button>
            : null}
        </div>
    )
}

export default Cart