import React from 'react';
import { addToCart } from '../api';

const Product = (props) => {
  const {loginToken} = props
  return (
    <div className='product-card'>
      <img src={process.env.PUBLIC_URL+`/assets/${props.data.image}`} alt='product' width='120px' height='120px'/>
      <h3>{props.data.name}</h3>
      <p>{props.data.description}</p>
      <h4>${props.data.price/100}</h4>
      {/* { loginToken ? */}
      <button type='button' id='addToCart' onClick={async () => {
              const test = await addToCart(loginToken, props.data.id, 1, props.data.price)
              console.log(test)
              alert('item added!')
            }}>add to cart</button>
      {/* // : null} */}
    </div>
  )
}

export default Product