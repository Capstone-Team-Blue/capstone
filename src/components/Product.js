import React from 'react';

const Product = (props) => {
  return (
    <div className='product-card'>
      <img src={process.env.PUBLIC_URL+`/assets/${props.data.image}`} alt='product' width='120px' height='120px'/>
      <h3>{props.data.name}</h3>
      <p>{props.data.description}</p>
      <h4>${props.data.price/100}</h4>
    </div>
  )
}

export default Product