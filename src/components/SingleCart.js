import React, { useState } from 'react'
import { getUserCart, updateQuantity, removeFromCart } from '../api'

const SingleCart = (props) => {

    const {setCart, loginToken, el, setCostsCalc} = props
    const [quantity, setQuantity] = useState(el.quantity)


    return(
        <div id='singleCartItem'>
            <div className='cartItems'>
                <h3 id='orderNumber'>Order number: {el.orderId}</h3>
                <h4 id='productNumber'>Product: {el.name}</h4>
                <p>Price per unit: $ {el.unitCost/100}</p>
                <p>Quantity: {quantity}</p>
                <form className='CartForm' onSubmit={async (event) => {
                    event.preventDefault()
                    try{
                        await updateQuantity(quantity, el.id, loginToken)
                        setCostsCalc(await getUserCart(loginToken))
                    } catch (error){
                        console.log(error)
                    }
                }}>
                    <input id={el.id}
                        type='number'
                        min='1'
                        step='1'
                        placeholder='quantity'
                        value={quantity}
                        onChange={(event) => {setQuantity(event.target.value)}}
                    ></input>
                    <button type='submit' id='quantityButton'>Update Cart</button>
                    <button type='button' id='deleteFromCart' onClick={async () => {
                        await removeFromCart(el.id, loginToken)
                        setCart(await getUserCart(loginToken))
                        setCostsCalc(await getUserCart(loginToken))
                        }}>Remove</button>
                </form>
            </div>
        </div>
    )
}

export default SingleCart

