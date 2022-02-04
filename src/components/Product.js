import React from 'react';
import {Link} from 'react-router-dom'
import { addToCart } from '../api';

const Product = ({product, loginToken, cart, setCart}) => {
  let price = product.price / 100;

  return (
    <div className='product-card'>
      <Link to={`/single/${product.id}`}>
        <img src={process.env.PUBLIC_URL+`/assets/${product.image}`} width='120px' height='120px'/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>${price}</h4>
        <h2>View</h2>
      </Link>
      { loginToken ?
        <button type='button' id='addToCart' onClick={async () => {
              const test = await addToCart(loginToken, product.id, 1, product.price)
              alert('item added!')
            }}>add to cart</button>
        : null}

        { !loginToken ?
        <button type='button' id='addToCart' onClick={async () => {
              let cartCopy = cart.slice()
              cartCopy.push(product)
              setCart(cartCopy)
              alert('item added!')
            }}>add to cart</button>
        : null}
    </div>
  )
}

export default Product