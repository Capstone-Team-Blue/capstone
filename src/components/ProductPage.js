import React from 'react';
import ProductList from './ProductList';

const ProductPage = ({products, loginToken, guestCart, setGuestCart}) => {

  return (
    <div>
      <ProductList products={products} loginToken={loginToken} guestCart={guestCart} setGuestCart={setGuestCart}/>
    </div>
  )
}

export default ProductPage;