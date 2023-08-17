import React, { Fragment } from 'react'

export default function List({ data, orderDate, orderNumber, removeItem }) {
    return (
        <>
            <h6>Date:{orderDate} || {orderNumber}</h6>
            <h2>Items List:</h2>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <>
                            <tr key={index}>
                                <td>{item.itemName}</td>
                                <td>{item.quantity}</td>
                                <td>${item.unitPrice.toFixed(2)}</td>
                                <td>${item.total.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5">Description: {item.itemDescription}</td>
                            </tr>
                        </>
                    ))}


                </tbody>
            </table >
        </>
    )
}
