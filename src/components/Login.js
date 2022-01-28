import { user } from 'pg/lib/defaults'
import React, { useState } from 'react'
import { loginUser } from '../api'

const Login = (props) => {

    const {setIsLoggedIn, setLoginToken, setGlobalUserId} = props

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameRegister, setUsernameRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")

    return(
        <div>
            <form className='loginRegister' onSubmit={async (event) => {
                event.preventDefault()
                try{
                    let data = await loginUser(username, password)
                    if(data.user.username){ 
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
    )
}

export default Login