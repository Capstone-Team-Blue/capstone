import React, { useState, useEffect } from 'react'
import { getUserCart, updateQuantity } from '../api'

const Cart = (props) => {
    const { globalUserId, loginToken } = props
    const [ cart, setCart ] = useState([])

    useEffect(() => {
        async function getCurrentCart(loginToken){
            setCart(await getUserCart(loginToken))
        }
        getCurrentCart(loginToken)
    }, [loginToken])

    console.log(cart)

    return (
        <div id='cart'>
            <h1>Your Cart</h1>
            <div id='singleCartItem'>
                { cart ? cart.map((el, index) => (
                    <div key={index} className='cartItems'>
                        <h3>Order number: {el.orderId}</h3>
                        <h4>Product number: {el.productId}</h4>
                        <p>Price: {el.unitCost/100 * el.quantity}</p>
                        <label htmlFor='quantity'>Quantity: </label>
                        <form className='CartForm' onSubmit={async (event) => {
                            event.preventDefault()
                            try{
                                let updateItem = document.getElementById(el.id)
                                console.log(updateItem)
                                // await updateQuantity(el.quantity)
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
                        </form>
                    </div>
                )) : null }
            </div>
        </div>
    )
}

export default Cart