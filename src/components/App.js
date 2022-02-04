import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route } from 'react-router-dom'
import Login from './Login'
import Header from './Header'
import Orders from './Orders'
import ProductPage from './ProductPage'
import Cart from './Cart'
import SingleProduct from './SingleProduct';

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState([])
  const [guestCart, setGuestCart] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://calm-fjord-72273.herokuapp.com/api/products');
      const data = await response.json();
      setProducts(data)
    }
    fetchProducts();
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header  setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setUsername={setUsername} setPassword={setPassword} isLoggedIn={isLoggedIn} />
        <Route path='/login'>
          <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          { isLoggedIn ?
            <><Orders loginToken={loginToken} globalUserId={globalUserId}/></>
            :
            <h1>YOU MUST BE LOGGED IN TO VIEW THIS PAGE!</h1>
          }
        </Route>
        <Route path='/cart'>
          <Cart globalUserId={globalUserId} loginToken={loginToken} guestCart={guestCart} setGuestCart={setGuestCart}/>
         </Route>
        <Route exact path='/'>
          <ProductPage className='product-page' loginToken={loginToken} products={products} guestCart={guestCart} setGuestCart={setGuestCart}/>
        </Route>
        <Route exact path='/single/:productId'>
          <SingleProduct className='single-product-page' products={products}/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;