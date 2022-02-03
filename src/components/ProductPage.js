import React, {useState, useEffect} from 'react';
import ProductList from './ProductList';



const ProductPage = () => {
  const [products, setProducts] = useState([]);

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
      <ProductList products={products}/>
    </div>
  )

}

export default ProductPage;