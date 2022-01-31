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
        <Nav />
        <Route path='/login'>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          <Orders loginToken={loginToken} globalUserId={globalUserId}/>
        </Route>
        <Route path='/cart'>
          <Cart globalUserId={globalUserId}/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;