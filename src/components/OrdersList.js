import React, { useState, useEffect } from "react"
import { getUserOrders } from "../api"

const OrdersList = (props) => {
    const { loginToken, globalUserId } = props

    const [ myOrders, setMyOrders ] = useState([])

    useEffect(() => {
        async function getAllMyOrders(loginToken, globalUserId){
            setMyOrders(await getUserOrders(loginToken, globalUserId))
        }
        getAllMyOrders(loginToken, globalUserId)
    }, [])

    return (
        loginToken ? 
        <div id='ordersListContainer'>
            <h2>Orders List</h2>
            <div>
                <ul>
                {myOrders ? myOrders.map((el, idx) => (
                    <li key={idx}>Order id#: {el.id}</li>
                )) : undefined}
                </ul>
            </div>
        </div>
        :
        <div id='ordersListContainer'>
            <h2>No logged in user</h2>
        </div>
    )
}

export default OrdersList