import React from 'react';
import ProductList from './ProductList';

const ProductPage = ({products, loginToken}) => {

  return (
    <div className='product-page-container'>
      <ProductList products={products} loginToken={loginToken}/>
    </div>
  )
}

export default ProductPage;