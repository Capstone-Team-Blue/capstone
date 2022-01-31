import React from "react"
import { Link } from 'react-router-dom'

const Nav = (props) => {
    return (
        <div id='navBar' style={{margin: "10px 0px"}}>
            <Link to="/login"><button className="linkButton">Login</button></Link>
            <Link to="/myorders"><button className="linkButton">My Orders</button></Link>
            <Link to="/cart"><button className="linkButton">My Cart</button></Link>
        </div>
    )
}

export default Nav