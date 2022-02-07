import React from 'react';
import {Link} from 'react-router-dom';


import { Container, Typography, Button, Grid } from "@material-ui/core";
import logo from "../logo.png";

const CheckoutBanner = () => {
  return (
    <div className="checkout-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Press the button to shop now.
            </Typography>
            <Link to={'/'}>
              <Button className="shopping-button" color="secondary" variant="contained">
                Shopping
              </Button>
            </Link>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img src={logo} alt="Grace Shopper" height="420px" width="520px"/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CheckoutBanner;