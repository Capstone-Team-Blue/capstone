import React from 'react';
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
            <Button className="shopping-button" color="secondary" variant="contained" href="/">
              Shopping
            </Button>
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