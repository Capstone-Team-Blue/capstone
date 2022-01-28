import { user } from 'pg/lib/defaults'
import React, { useState } from 'react'
import { loginUser, registerUser } from '../api'

const Login = (props) => {

    const {setIsLoggedIn, setLoginToken, setGlobalUserId} = props

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameRegister, setUsernameRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    return(
        <div className='formContainer'>
            <div id='loginForm'>
                <h3>Login</h3>
                <form className='loginRegister' onSubmit={async (event) => {
                    event.preventDefault()
                    try{
                        let data = await loginUser(username, password)
                        if(data.user.username){ 
                            setIsLoggedIn(true) 
                            setLoginToken(data.token)
                            setGlobalUserId(data.user.id)
                        }
                        console.log(data)
                    } catch(err){
                        setIsLoggedIn(false)
                        console.log(err)
                    }
                }}>
                    <div>
                        <label htmlFor='enterUsername'>Enter username: </label>
                        <input
                            id="enterUsername"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='enterPassword'>Enter password:</label>
                            <input
                                id="enterPassword"
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required>
                            </input>
                    </div>
                    <button type='submit' id='logInButton'>Log In</button>
                </form>
            </div>
            
            <div id='registerForm'>
                <h3>Register</h3>
                <form className='loginRegister' onSubmit={async (event) => {
                    event.preventDefault()
                    try{
                        let data = await registerUser(usernameRegister, passwordRegister, email, address)
                        if(data.jwt){ 
                            setIsLoggedIn(true) 
                            setLoginToken(data.token)
                            setGlobalUserId(data.user.id)
                        }
                    } catch(err){
                        setIsLoggedIn(false)
                        console.log(err)
                    }
                }}>
                    <div>
                        <label htmlFor='enterDesiredUsername'>Username: </label>
                        <input
                            id="enterDesiredUsername"
                            type="text"
                            placeholder="Enter your desired username"
                            value={usernameRegister}
                            onChange={(event) => setUsernameRegister(event.target.value)}
                            required>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='enterDesiredPassword'>Password:</label>
                            <input
                                id="enterDesiredPassword"
                                type="password"
                                placeholder="Enter your desired password"
                                value={passwordRegister}
                                onChange={(event) => setPasswordRegister(event.target.value)}
                                required>
                            </input>
                    </div>

                    <div>
                        <label htmlFor='enterEmail'>Email:</label>
                            <input
                                id="enterEmail"
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required>
                            </input>
                    </div>

                    <div>
                        <label htmlFor='enterAddress'>Address:</label>
                            <input
                                id="enterAddress"
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required>
                            </input>
                    </div>
                    <button type='submit' id='registerButton'>Sign Up</button>
                </form>
            </div>

        </div>
    )
}

export default Login