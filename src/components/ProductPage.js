import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';



const ProductPage = ({products}) => {

  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default ProductPage;