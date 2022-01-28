import React, { useEffect } from "react"
import { getUserOrders } from "../api"

const OrdersList = (props) => {
    const { loginToken } = props

    useEffect(() => {
        async function getAllMyOrders(loginToken){
            console.log(loginToken)
            console.log(await getUserOrders(loginToken))
        }
        getAllMyOrders(loginToken)
    }, [])

    return (
        <div id='ordersListContainer'>
            Orders List
        </div>
    )
}

export default OrdersList