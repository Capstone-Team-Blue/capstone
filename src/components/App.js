import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import Orders from './Orders'
import ProductPage from './ProductPage';
import logo from '../assets/logo.png';
;



const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')


  return (
    <BrowserRouter>
      <div className="App">
        <a href="http://localhost:3000/"><img className='logo' src={logo} /></a>
        <Nav />
        <Route path='/login'>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          <Orders loginToken={loginToken} globalUserId={globalUserId}/>
        </Route>
        <Route exact path='/'>
          <ProductPage className='product-page'/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;