import React from "react"

const OrderDetails = (props) => {
    const { loginToken, myOrders, selectedOrder } = props

    let totalCost = 0

    if (selectedOrder) {
        myOrders[selectedOrder].products.map((elem) => {
            totalCost += elem.quantity * elem.unitCost/100
        })
    }

    return (
        loginToken ?
            <div id='orderDetailsContainer'>
                <h2>Order Details</h2>
                <div>
                    {selectedOrder ? myOrders[selectedOrder].products.map((el, idx) => (
                        <div className="orderDetailsItem" key={idx}>
                            <div id='detailNameAndId'>
                                <h3>Product Name: {el.name}</h3><div>id#: {el.productId}</div>
                            </div>
                            <div id='detailQuantityAndCosts'>
                                <div>Quantity: {el.quantity}</div>
                                <div>Single Unit Cost: ${el.unitCost/100}</div>
                                <div>Product Total Cost: ${el.quantity * el.unitCost/100}</div>
                            </div>
                        </div>
                    )) : undefined}
                </div>
                {selectedOrder ? <div id='orderDetailTotalCost'><h3>Selected Order Total Cost: ${totalCost}</h3></div> : undefined }
            </div>
        :
            <div id='orderDetailsContainer'>
                <h2>No logged in user</h2>
            </div>
    )
}

export default OrderDetails