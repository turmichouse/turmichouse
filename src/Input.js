import React, { useState, useEffect, useRef } from 'react';

const InputForm = ({
    formattedDate,
    itemName,
    itemDescription,
    unitPrice,
    quantity,
    setItemName,
    setItemDescription,
    setUnitPrice,
    setQuantity,
    handleSubmit,
    itemNameRef
}) => {
    useEffect(() => {
        if (itemNameRef.current) {
            itemNameRef.current.focus();
        }
    }, [itemNameRef]);


    return (
        <form onSubmit={handleSubmit}>
            <div className=' py-5'>
                <h4>Date: {formattedDate}</h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Item Name"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        ref={itemNameRef}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            placeholder="Unit Price"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mt-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Special Instruction"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary">Add Item</button>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default InputForm;
