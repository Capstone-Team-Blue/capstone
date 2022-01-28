import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello, World!</h1>
        <h2>{ message }</h2>
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginToken={loginToken} setLoginToken={setLoginToken} globalUserId={globalUserId} setGlobalUserId={setGlobalUserId}/>
      </div>
    </BrowserRouter>
  );
}

export default App;