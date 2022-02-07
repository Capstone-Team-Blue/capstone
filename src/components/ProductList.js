import React from 'react';
import Product from './Product';
import {Grid, Container} from '@material-ui/core';
;



const ProductList = (props) => {
  const{loginToken, cart, setCart} = props
  return (
    <ul className='product-list'>
      <Container id="products">
        <Grid container spacing={4}>
          {props.products.map(product => {
            return (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Product product={product} loginToken={loginToken} cart={cart} setCart={setCart}/>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </ul>
  );
}

export default ProductList