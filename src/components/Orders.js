import React from "react"
import OrdersList from "./OrdersList"
import OrderDetails from "./OrderDetails"

const Orders = (props) => {
    return (
        <div id="ordersContainer">
            <OrdersList />
            <OrderDetails />
        </div>
    )
}

export default Orders