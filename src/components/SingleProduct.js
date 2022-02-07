import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Grid, Container, Button, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import { addToCart } from '../api';




const SingleProduct = (props) => {
  const {loginToken, cart, setCart} = props;
  const [product, setProduct] = useState({});
  const {productId} = useParams();

  useEffect(() => {
    async function fetchProduct(id) {
      const response = await fetch(`https://calm-fjord-72273.herokuapp.com/api/products/${productId}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
    }
    fetchProduct(productId);
  }, [productId])

  let price = product.price / 100;

  return (
    <div>
    <Container className="single-product-container">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} className="image-wrapper">
          <img
            src={process.env.PUBLIC_URL+`/assets/${product.image}`}
            alt={product.name}
            height="320px"
          />
        </Grid>
        <Grid item xs={12} md={4} className="text">
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="h4">Description: {product.description}</Typography>
          <Typography variant="h3">Price: ${price}</Typography>
        </Grid>
        <Grid item xs={12}>
        { loginToken ?
        <Button
        type='button'
        className='custom-button'
        // variant="contained"
        size="small"
        color="secondary"
        onClick={async () => {
              await addToCart(loginToken, product.id, 1, product.price)
              alert('item added!')
            }}> <ShoppingCart/>add to cart</Button>
        : null}

        { !loginToken ?
        <Button
        type='button'
        // variant="contained"
        className='custom-button'
        size="large"
        color="secondary"
        onClick={async () => {
              let cartCopy = cart.slice()
              cartCopy.push(product)
              setCart(cartCopy)
              alert('item added!')
            }}><ShoppingCart />add to cart</Button>
        : null}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default SingleProduct;