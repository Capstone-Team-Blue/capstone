import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser, registerUser } from '../api'

const Login = (props) => {

    const { username, setUsername, password, setPassword, setIsLoggedIn, isLoggedIn, setLoginToken, setGlobalUserId } = props

    const [usernameRegister, setUsernameRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    const [registerMessage, setRegisterMessage] = useState("")

    const history = useHistory()

    const handleSubmit = () => {
        history.push('/')
    }

    return (
        <div className='formContainer'>
            <div id='loginForm'>
                <h5>{loginMessage}</h5>
                <h3>Login</h3> 
                <form className='loginRegister' onSubmit={async (event) => {
                    event.preventDefault()
                    try {
                        let data = await loginUser(username, password)
                        if (data.token) {
                            setIsLoggedIn(true)
                            setLoginToken(data.token)
                            setGlobalUserId(data.user.id)
                            setUsername('')
                            setPassword('')
                            handleSubmit()
                        }
                        else {
                            setLoginMessage('Please check your username or password and try logging in again')
                            setIsLoggedIn(false)
                        }
                    } catch (err) {
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
                <h5>{registerMessage}</h5>
                <h3>Register</h3>
                <form className='loginRegister' onSubmit={async (event) => {
                    event.preventDefault()
                    try {
                        let data = await registerUser(usernameRegister, passwordRegister, email, address)
                        if (data.token) {
                            setIsLoggedIn(true)
                            setLoginToken(data.token)
                            setGlobalUserId(data.user.id)
                            setUsernameRegister('')
                            setPasswordRegister('')
                            setEmail('')
                            setAddress('')
                        }
                        else {
                            setRegisterMessage('Your email or username may already be in use')
                            setIsLoggedIn(false)
                        }
                    } catch (err) {
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