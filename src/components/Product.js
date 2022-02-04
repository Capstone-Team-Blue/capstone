import React from 'react';
import {Link} from 'react-router-dom'

const Product = ({product}) => {
  let price = product.price / 100;

  return (
    <div className='product-card'>
      <Link to={`/${product.id}`}>
        <img src={process.env.PUBLIC_URL+`/assets/${product.image}`} width='120px' height='120px'/>
        <h3>{product.name}</h3>
        {/* <p>{product.description}</p> */}
        <h4>${price}</h4>
        <h2>View</h2>
      </Link>
    </div>
  )
}

export default Product