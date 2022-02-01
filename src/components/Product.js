import React from 'react';

const Product = (props) => {
  return (
    <div className='product-card'>
      
      <h3>{props.data.name}</h3>
      <p>{props.data.description}</p>
      <h4>${props.data.price}</h4>
    </div>
  )
}

export default Product