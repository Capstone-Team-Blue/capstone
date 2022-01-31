import React, { useState, useEffect } from "react"
import OrdersList from "./OrdersList"
import OrderDetails from "./OrderDetails"
import { getUserOrders } from "../api"

const Orders = (props) => {
    const { loginToken, globalUserId } = props

    const [ selectedOrder, setSelectedOrder ] = useState('')
    const [ myOrders, setMyOrders ] = useState([])

    useEffect(() => {
        async function getAllMyOrders(loginToken, globalUserId){
            setMyOrders(await getUserOrders(loginToken, globalUserId))
        }
        getAllMyOrders(loginToken, globalUserId)
    }, [])

    console.log('myOrders:', myOrders)

    return (
        <div id="ordersContainer">
            <OrdersList loginToken={loginToken} setSelectedOrder={setSelectedOrder} myOrders={myOrders}/>
            <OrderDetails loginToken={loginToken} myOrders={myOrders} selectedOrder={selectedOrder} />
        </div>
    )
}

export default Orders