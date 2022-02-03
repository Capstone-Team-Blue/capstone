import React from 'react';
import ProductList from './ProductList';

const ProductPage = ({products}) => {

  return (
    <div>
      <ProductList products={products} loginToken={loginToken}/>
    </div>
  )
}

export default ProductPage;