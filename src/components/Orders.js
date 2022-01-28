import React from "react"
import {
    OrdersList,
    OrderDetails } from './index'

const Orders = (props) => {
    return (
        <div id="ordersContainer">
            <OrdersList />
            <OrderDetails />
        </div>
    )
}

export default Orders