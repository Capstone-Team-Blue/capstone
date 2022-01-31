import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import Orders from './Orders'
import Cart from './Cart'

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello, World!</h1>
        <Nav loginToken={loginToken}/>
        <Route path='/login'>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          <Orders loginToken={loginToken}/>
        </Route>
        <Route path='/cart'>
          <Cart globalUserId={globalUserId} loginToken={loginToken}/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;