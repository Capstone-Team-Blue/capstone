import React, { useEffect } from "react"

const OrdersList = (props) => {
    const { loginToken, setSelectedOrder, myOrders } = props

    useEffect(() => {
        if (loginToken) {
            const orders = [...document.getElementsByClassName('ordersListItem')]
            for (let i = 0; i < orders.length; i++) {
                orders[i].addEventListener('click', () => {
                    setSelectedOrder(orders[i].id)
                })
            }
        }
    }, [myOrders])

    console.log(myOrders)

    return (
        loginToken ? 
        <div id='ordersListContainer'>
            <h2>Orders List</h2>
            <div>
                {myOrders[0] ? myOrders.map((el, idx) => (
                    el.isCart ? undefined : <div id={idx} className='ordersListItem' key={idx}>Order id#: {el.id}</div>
                )) 
                : 
                <div className="ordersListItem">No orders yet!</div>
                }
            </div>
        </div>
        :
        <div id='ordersListContainer'>
            <h2>No logged in user</h2>
        </div>
    )
}

export default OrdersList