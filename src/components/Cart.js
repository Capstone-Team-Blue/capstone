import React, { useState, useEffect } from 'react'
import { checkout, getUserCart } from '../api'
import SingleCart from './SingleCart'

const Cart = (props) => {
    const { loginToken } = props
    const [ cart, setCart ] = useState([])
    const [costsCalc, setCostsCalc] = useState([])
    let totalCost = 0

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
                setCostsCalc(await getUserCart(loginToken))
            }
        }
        getCurrentCart(loginToken)
    }, [loginToken])

    costsCalc.forEach((el, index) => {
        if (index === 0) totalCost = 0
        totalCost += el.quantity * el.unitCost
    })
    totalCost = totalCost/100

    return (
        <div id='cart'>
            <h1>Your Cart</h1>

            { cart.length ? cart.map((el, index) => (
                <SingleCart key={index} setCart={setCart} loginToken={loginToken} el={el} index={index} setCostsCalc={setCostsCalc}/>
            )) : null }

            {cart.length ?
            <div id='totalCost'>
                <h4>Cart Total:</h4>
                <p>$ {totalCost}</p>
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