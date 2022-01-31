import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Login from './Login'

const App = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loginToken, setLoginToken ] = useState('')
  const [ globalUserId, setGlobalUserId ] = useState('')


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello, World!</h1>
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} setGlobalUserId={setGlobalUserId}/>
      </div>
    </BrowserRouter>
  );
}

export default App;