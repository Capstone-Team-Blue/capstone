import React from "react"
import OrdersList from "./OrdersList"
import OrderDetails from "./OrderDetails"

const Orders = (props) => {
    const { globalUserId } = props
    return (
        <div id="ordersContainer">
            <OrdersList globalUserId={globalUserId}/>
            <OrderDetails />
        </div>
    )
}

export default Orders