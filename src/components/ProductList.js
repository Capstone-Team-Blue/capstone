import React from 'react';
import Product from './Product';



const ProductList = (props) => {
  return (
    <ul className='product-list'>
      {props.products.map(product => {
        return <Product data={product} key={product.id} />;
      })}
    </ul>
  );
}

export default ProductList