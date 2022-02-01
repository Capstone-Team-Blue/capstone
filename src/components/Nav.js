import React from "react"
import { Link } from 'react-router-dom'

const Nav = (props) => {

    const { setIsLoggedIn, setLoginToken, setUsername, setPassword, isLoggedIn } = props

    function logout() {
        setIsLoggedIn(false)
        setLoginToken('')
        setUsername('')
        setPassword('')
    }

    return (
        <div id='navBar' style={{margin: "10px 0px"}}>
            { isLoggedIn ?
                <><Link to="/"><button className="linkButton" onClick={logout}>Logout</button></Link></>
                :
                <><Link to="/login"><button className="linkButton">Login / Register</button></Link></>
            }
            { isLoggedIn ?
                <><Link to="/myorders"><button className="linkButton">My Orders</button></Link></>
                :
                undefined
            }
            <Link to="/cart"><button className="linkButton">My Cart</button></Link>
        </div>
    )
}

export default Nav