import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const {productId} = useParams();

  useEffect(() => {
    async function fetchProduct(id) {
      const response = await fetch('https://calm-fjord-72273.herokuapp.com/api/:productId');
      const data = await response.json();
      const {name, price, image, description} = data;
      console.log(data);
      setProduct({id, name, price, image, description});
    }
    // const id = window.location.pathname.split("/");
    fetchProduct(productId);
  }, [productId])

  return (
    <div>
      <img src={process.env.PUBLIC_URL+`/assets/${product.image}`} width='120px' height='120px'/>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <h4>{product.price}</h4>
    </div>
  );
}

export default SingleProduct;