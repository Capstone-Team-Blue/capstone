import React from 'react';
import Product from './Product';



const ProductList = (props) => {
  const{loginToken, guestCart, setGuestCart} = props
  return (
    <ul className='product-list'>
      {props.products.map(product => {
        return <Product product={product} key={product.id} loginToken={loginToken} guestCart={guestCart} setGuestCart={setGuestCart}/>;
      })}
    </ul>
  );
}

export default ProductList