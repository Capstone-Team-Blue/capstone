import React from "react"
import { Link } from 'react-router-dom'

const Nav = (props) => {
    return (
        <div id='navBar'>
            <Link to="/login"><button className="linkButton">Login</button></Link>
            <Link to="/orders"><button className="linkButton">My Orders</button></Link>
        </div>
    )
}

export default Nav