import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'
<<<<<<< HEAD
import Nav from './Nav'
import Orders from './Orders'

const App = () => {
=======

const App = () => {

>>>>>>> 1bb0850b3e638413ca0049043d430768e9e2bb46
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello, World!</h1>
<<<<<<< HEAD
        <Nav />
        <Route path='/login'>
          <Login setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
        </Route>
        <Route path='/myorders'>
          <Orders globalUserId={globalUserId}/>
        </Route>
=======
        <Login setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
>>>>>>> 1bb0850b3e638413ca0049043d430768e9e2bb46
      </div>
    </BrowserRouter>
  );
}

export default App;