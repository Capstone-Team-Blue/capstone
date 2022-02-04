import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const {productId} = useParams();

  async function fetchProduct(id) {
    const response = await fetch(`https://calm-fjord-72273.herokuapp.com/api/products/${productId}`);
    const data = await response.json();
    console.log(data);
    setProduct(data);
  }
  useEffect(() => {
    // const id = window.location.pathname.split("/");
    fetchProduct(productId);
  }, [productId])

  let price = product.price / 100;

  return (
    <div className="single-product-container">
      <img src={process.env.PUBLIC_URL+`/assets/${product.image}`} width='120px' height='120px'/>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <h4>${price}</h4>
    </div>
  );
}

export default SingleProduct;