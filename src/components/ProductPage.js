import React from 'react';
import ProductList from './ProductList';

const ProductPage = ({products, loginToken}) => {

  return (
    <div>
      <ProductList products={products} loginToken={loginToken}/>
    </div>
  )
}

export default ProductPage;