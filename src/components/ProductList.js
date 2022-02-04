import React from 'react';
import Product from './Product';



const ProductList = (props) => {
  const{loginToken, cart, setCart} = props
  return (
    <ul className='product-list'>
      {props.products.map(product => {
        return <Product product={product} key={product.id} loginToken={loginToken} cart={cart} setCart={setCart}/>;
      })}
    </ul>
  );
}

export default ProductList