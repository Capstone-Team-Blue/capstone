import React, { useEffect } from 'react'
import { checkout, getUserCart } from '../api'
import SingleCart from './SingleCart'
import CheckoutBanner from './CheckoutBanner';
;


const Cart = (props) => {
    const { loginToken, cart, setCart } = props
    let totalCost = 0

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
            }
            else{
                setCart(cart)
            }
        }
        getCurrentCart(loginToken)
    }, [loginToken])

    useEffect(() => {
        console.log('new cost calc: ', cart)
    }, [cart])

    cart.forEach((el, index) => {
        if (index === 0) totalCost = 0
        if(!el.quantity) el.quantity = 1
        if(loginToken){
            console.log('QUANTITY FOR LOGGED IN', el.quantity)
            totalCost += el.quantity * el.unitCost
        }
        else{
            console.log('QUANTITY FOR GUEST', el.quantity)
            totalCost += el.price * el.quantity
        }
    })
    totalCost = totalCost/100

    return (
        <div id='cart'>
            <h1>Your Cart</h1>

            { cart.length ? cart.map((el, index) => (
                <SingleCart key={index} cart={cart} setCart={setCart} loginToken={loginToken} el={el} index={index}/>
            )) : null }

            {cart.length ?
            <div id='totalCost'>
                <h4>Cart Total:</h4>
                <p>$ {totalCost}</p>
            </div>
            : null}
            {cart.length ?
            <button type='button' id='checkout' onClick={async () => {
                if(loginToken){
                    await checkout(cart[0].orderId, loginToken)
                    setCart(await getUserCart(loginToken))
                }
                else{
                    setCart([])
                }
                alert('cart checked out!')
            }}>checkout</button>
            : <CheckoutBanner/>}
        </div>
    )
}

export default Cart