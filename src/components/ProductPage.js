import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';



const ProductPage = (props) => {
  const [products, setProducts] = useState([]);
  const {loginToken} = props

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://calm-fjord-72273.herokuapp.com/api/products');
      const data = await response.json();
      setProducts(data)
    }
    fetchProducts();
  }, [])

  return (
    <div>
      <ProductList products={products} loginToken={loginToken}/>
    </div>
  )

}

export default ProductPage;