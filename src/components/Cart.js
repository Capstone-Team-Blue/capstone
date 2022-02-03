import React, { useState, useEffect } from 'react'
import { checkout, getUserCart } from '../api'
import SingleCart from './SingleCart'

const Cart = (props) => {
    const { loginToken } = props
    const [ cart, setCart ] = useState([])
<<<<<<< HEAD
=======
    const [costsCalc, setCostsCalc] = useState([])
    const [ productImage, setProductImage ] = useState([])
>>>>>>> dfbe6e6b567870d1fd827c1f6de302e28b7350d8
    let totalCost = 0

    useEffect(() => {
        async function getCurrentCart(loginToken){
            if(loginToken){
                setCart(await getUserCart(loginToken))
                setCostsCalc(await getUserCart(loginToken))
            }
            const response = await fetch('http://localhost:4000/api/products');
            const data = await response.json();
            setProductImage(data)
        }
        getCurrentCart(loginToken)
    }, [loginToken])

<<<<<<< HEAD
    cart.map((el, index) => {
=======
    costsCalc.map((el, index) => {
>>>>>>> dfbe6e6b567870d1fd827c1f6de302e28b7350d8
        if (index === 0) totalCost = 0
        totalCost += el.quantity * el.unitCost
    })
    totalCost = totalCost/100

    return (
        <div id='cart'>
            <h1>Your Cart</h1>

            { cart.length ? cart.map((el, index) => (
<<<<<<< HEAD
                <SingleCart key={index} setCart={setCart} loginToken={loginToken} el={el} index={index}/>
=======
                <SingleCart key={index} setCart={setCart} loginToken={loginToken} el={el} index={index} setCostsCalc={setCostsCalc} productImage={productImage}/>
>>>>>>> dfbe6e6b567870d1fd827c1f6de302e28b7350d8
            )) : null }

            {cart.length ?
            <div id='totalCost'>
                <h4>Cart Total:</h4>
<<<<<<< HEAD
                {/* {costs.map((el) => {totalCost += el})} */}
=======
>>>>>>> dfbe6e6b567870d1fd827c1f6de302e28b7350d8
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