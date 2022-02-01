import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'
import Nav from './Nav'
import Orders from './Orders'
import ProductPage from './ProductPage';
import Cart from './Cart'
import logo from '../assets/logo.png';
;

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello, World!</h1>
        <Nav setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setUsername={setUsername} setPassword={setPassword} isLoggedIn={isLoggedIn} />
        <Link to="/"><img className='logo' src={logo} /></Link>
        <Route path='/login'>
          <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          { isLoggedIn ? 
            <><Orders loginToken={loginToken} globalUserId={globalUserId}/></>
            :
            <h1>YOU MUST BE LOGGED IN TO VIEW THIS PAGE!</h1>
          }
        </Route>
        <Route exact path='/'>
          <ProductPage/>
        </Route>
        <Route path='/cart'>
          <Cart globalUserId={globalUserId} loginToken={loginToken}/>
         </Route>
        <Route exact path='/'>
          <ProductPage className='product-page'/>
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;