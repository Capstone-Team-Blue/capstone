import React from 'react';
import ProductList from './ProductList';

const ProductPage = ({products, loginToken, cart, setCart}) => {

  return (
      <div className='product-page-container'>
        <ProductList products={products} loginToken={loginToken} cart={cart} setCart={setCart}/>
      </div>
  )
}

export default ProductPage;