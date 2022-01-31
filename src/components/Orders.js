import React from "react"
import OrdersList from "./OrdersList"
import OrderDetails from "./OrderDetails"

const Orders = (props) => {
    const { loginToken, globalUserId } = props
    return (
        <div id="ordersContainer">
            <OrdersList loginToken={loginToken} globalUserId={globalUserId}/>
            <OrderDetails />
        </div>
    )
}

export default Orders