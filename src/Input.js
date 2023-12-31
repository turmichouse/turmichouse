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
    itemNameRef,
    footerNote,
    setFooterNote,
    tipsCat,
    handlesetCatTips,
    deliveryFee,
    handleSetDeliveryFee, tax, handleTax
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
                                        required="true"
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
                        <input required="true"
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
                            required="true"
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
                <div className='row'>
                    <input
                        type="text"
                        className="form-control mt-5"
                        placeholder="Special Note"
                        value={footerNote}
                        onChange={(e) => setFooterNote(e.target.value)}
                    />
                </div>
                <div className='row'>
                    <label className='mt-2'>Catering Tips:</label>
                    <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="Catering Tips"
                        value={tipsCat}
                        onChange={(e) => handlesetCatTips(e.target.value)}
                    />
                </div>
                <div className='row'>
                    <label className='mt-2'>Delivery Fee:</label>
                    <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="Delivery Fee"
                        value={deliveryFee}
                        onChange={(e) => handleSetDeliveryFee(e.target.value)}
                    />
                </div>
                <div className='row'>
                    <label className='mt-2'>Tax:</label>
                    <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="Tax"
                        value={tax}
                        onChange={(e) => handleTax(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
};

export default InputForm;
