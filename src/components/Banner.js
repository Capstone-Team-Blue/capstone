import React from 'react';
import { Container, Typography, Grid } from "@material-ui/core";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to Grace Shopper
            </Typography>
          </Grid>
          {/* <Grid className="brand" item sm={6}>
            <img src={logo} alt="Grace Shopper" height="420px" width="520px"/>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;