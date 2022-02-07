import React from 'react';
import {Link} from 'react-router-dom'
import { addToCart } from '../api';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button
} from '@material-ui/core';
import { ShoppingCart } from "@material-ui/icons";

const Product = ({product, loginToken, cart, setCart}) => {
  let price = product.price / 100;

  return (
     <Card sx={{ maxWidth: 345 }}>
      <Link to={`/single/${product.id}`}>
       <CardActionArea>
        <CardMedia
          component="img"
          height="190px"
          className='card-image'
          image={process.env.PUBLIC_URL+`/assets/${product.image}`}
          alt="{product.name}"
        />
          <CardContent className='card-content'>
            <Typography className='title' gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
          </CardContent>
       </CardActionArea>
       </Link>
       <CardActions className='actions-content'>
         <>
          <Typography className='price' gutterBottom variant="h5" component="h2">
            ${price}
          </Typography>
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
        size="small"
        color="secondary"
        onClick={async () => {
              let cartCopy = cart.slice()
              cartCopy.push(product)
              setCart(cartCopy)
              alert('item added!')
            }}><ShoppingCart />add to cart</Button>
        : null}
         </>
      </CardActions>
    </Card>
  )
}

export default Product