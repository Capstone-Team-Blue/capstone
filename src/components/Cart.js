import React, { useState, useEffect } from 'react'
import { checkout, getUserCart, updateQuantity, removeFromCart } from '../api'

const Cart = (props) => {
    const { loginToken } = props
    const [ cart, setCart ] = useState([])
    const [nothing, setNothing] = useState('')
    let total = 0

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
            }
        }
        getCurrentCart(loginToken)
    }, [loginToken])

    function getTotalCost(total){
        if(nothing){
            console.log(nothing)
        }
        if(cart.length){
            cart.map((el) => {
                total = total + el.quantity*el.unitCost
            })
            return total = total/100
        }
    }

    total = getTotalCost(total)
    console.log(cart)

    return (
        <div id='cart'>
            <h1>Your Cart</h1>
            <div id='singleCartItem'>
                { cart.length ? cart.map((el, index) => (
                    <div key={index} className='cartItems'>
                        <h3 id='orderNumber'>Order number: {el.orderId}</h3>
                        <h4 id='productNumber'>Product: {el.name}</h4>
                        <p>Price per unit: $ {el.unitCost/100}</p>
                        <p>Quantity: {el.quantity}</p>
                        <form className='CartForm' onSubmit={async (event) => {
                            event.preventDefault()
                            try{
                                let updateItem = document.getElementById(el.id)
                                await updateQuantity(updateItem.value, updateItem.id, loginToken)
                                setCart(await getUserCart(loginToken))
                                updateItem.value = ''
                            } catch (error){
                                console.log(error)
                            }
                        }}>
                            <input id={el.id}
                                type='number'
                                min='1'
                                step='1'
                                placeholder='quantity'
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