import React from "react"
import { Link } from 'react-router-dom'
import {Button} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

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
                <><Link to="/"><Button className="linkButton" size="small" color="secondary"onClick={logout}>Logout</Button></Link></>
                :
                <><Link to="/login"><Button className="linkButton" size="small" color="secondary">Login / Register</Button></Link></>
            }
            { isLoggedIn ?
                <><Link to="/myorders"><Button className="linkButton" size="small"
                color="secondary">My Orders</Button></Link></>
                :
                undefined
            }
            <Link to="/cart"><Button className="linkButton"  size="small"
        color="secondary"><ShoppingCart /> My Cart</Button></Link>
        </div>
    )
}

export default Nav