import React, { useState } from 'react'
import { getUserCart, updateQuantity, removeFromCart } from '../api'

const SingleCart = (props) => {

    const {setCart, loginToken, el, index, setCostsCalc, guestCart, setGuestCart} = props
    const [quantity, setQuantity] = useState(el.quantity ? el.quantity : 1)
    
    return(
        <div id='singleCartItem'>
            <div className='cartItems'>
                <h3 id='orderNumber'>Order number: {el.orderId}</h3>
                <h4 id='productNumber'>Product: {el.name}</h4>
                <img src={process.env.PUBLIC_URL+`/assets/${el.image}`} alt='product' width='120px' height='120px'/>
                <p>Price per unit: $ { loginToken ? el.unitCost/100 : el.price/100 }</p>
                <p>Quantity: {quantity}</p>
                <form className='CartForm' onSubmit={async (event) => {
                    event.preventDefault()
                    try{
                        if(loginToken){
                            await updateQuantity(quantity, el.id, loginToken)
                            setCostsCalc(await getUserCart(loginToken))
                        }
                        else{
                            el.quantity = quantity
                            setCostsCalc(guestCart)
                        }
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
                        if(loginToken){
                            await removeFromCart(el.id, loginToken)
                            setCart(await getUserCart(loginToken))
                            setCostsCalc(await getUserCart(loginToken))
                        }
                        else{
                            guestCart.splice(index, 1)
                            setGuestCart(guestCart)
                            setCostsCalc(guestCart)
                        }
                        }}>Remove</button>
                </form>
            </div>
        </div>
    )
}

export default SingleCart

