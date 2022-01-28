import React from "react"
import OrdersList from "./OrdersList"
import OrderDetails from "./OrderDetails"

const Orders = (props) => {
    const { loginToken } = props
    return (
        <div id="ordersContainer">
            <OrdersList loginToken={loginToken}/>
            <OrderDetails />
        </div>
    )
}

export default Orders