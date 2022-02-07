import React from 'react';
import ProductList from './ProductList';
import Banner from './Banner';

const ProductPage = ({products, loginToken, cart, setCart}) => {

  return (
      <div className='product-page-container'>
        <Banner />
        <ProductList products={products} loginToken={loginToken} cart={cart} setCart={setCart}/>
      </div>
  )
}

export default ProductPage;