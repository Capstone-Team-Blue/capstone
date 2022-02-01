import { token } from 'morgan'
import React, { useState, useEffect } from 'react'
import { checkout, getUserCart, updateQuantity, removeFromCart } from '../api'

const Cart = (props) => {
    const { loginToken } = props
    const [ cart, setCart ] = useState([])
    const [ ordersId, setOrdersId ] = useState(-1)

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
            }
        }
        getCurrentCart(loginToken)
    }, [loginToken])

    console.log(cart)

    return (
        <div id='cart'>
            <h1>Your Cart</h1>
            <div id='singleCartItem'>
                { cart.length ? cart.map((el, index) => (
                    <div key={index} className='cartItems'>
                        <h3 id='orderNumber'>Order number: {el.orderId}</h3>
                        <h4 id='productNumber'>Product number: {el.productId}</h4>
                        <p>Price per unit: $ {el.unitCost}</p>
                        <label htmlFor='quantity'>Quantity: </label>
                        <form className='CartForm' onSubmit={async (event) => {
                            event.preventDefault()
                            try{
                                let updateItem = document.getElementById(el.id)
                                await updateQuantity(updateItem.value, updateItem.id, loginToken)
                            } catch (error){
                                console.log(error)
                            }
                        }}>
                            <input id={el.id}
                                type='number'
                                min='1'
                                step='1'
                                placeholder={el.quantity}
                            ></input>
                            <button type='submit' id='quantityButton'>Update Cart</button>
                            <button type='button' id='deleteFromCart' onClick={async () => {
                                await removeFromCart(el.id, loginToken)
                                setCart(await getUserCart(loginToken))
                                }}>Remove</button>
                        </form>
                    </div>
                )) : null }
            </div>
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