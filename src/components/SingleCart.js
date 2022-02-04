import React, { useState } from 'react'
import { getUserCart, updateQuantity, removeFromCart } from '../api'

const SingleCart = (props) => {

    const {setCart, loginToken, el, index, cart} = props
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
                            console.log('BEFORE,', cart)
                            await updateQuantity(quantity, el.id, loginToken)
                            setCart(await getUserCart(loginToken))
                        }
                        else{
                            console.log('BEFORE,', cart)
                            let cartCopy2 = cart.slice()
                            cartCopy2[index].quantity = quantity
                            setCart(cartCopy2)
                            console.log('AFTER', cart)
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
                        }
                        else{
                            let cartCopy = cart.slice()
                            console.log('CART', cart)
                            console.log('COPY', cartCopy)
                            cartCopy.splice(index, 1)
                            console.log('COPY DELETE', cartCopy)
                            setCart(cartCopy)
                        }
                        }}>Remove</button>
                </form>
            </div>
        </div>
    )
}

export default SingleCart

