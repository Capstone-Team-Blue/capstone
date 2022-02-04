import React from 'react';
import {Link} from 'react-router-dom'
import { addToCart } from '../api';

const Product = ({product, loginToken}) => {
  let price = product.price / 100;

  return (
    <div className='product-card'>
      <Link to={`/single/${product.id}`}>
        <img src={process.env.PUBLIC_URL+`/assets/${product.image}`} alt='product' width='120px' height='120px'/>
        <h3>{product.name}</h3>
        {/* <p>{product.description}</p> */}
        <h4>${price}</h4>
        {/* { loginToken ? */}
        <button type='button' id='addToCart' onClick={async () => {
              const test = await addToCart(loginToken, product.id, 1, product.price)
              console.log(test)
              alert('item added!')
            }}>add to cart</button>
        {/* // : null} */}
        <h2>View</h2>
      </Link>
    </div>
  )
}

export default Product