import React, { useState, useRef } from 'react';
import './App.css';

function App() {
    const [formattedDate, setFormattedDate] = useState('');
    const [orderName, setOrderName] = useState('');
    const [itemName, setItemName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    const itemNameRef = useRef(null);

    const handleAddItem = async (e) => {
        e.preventDefault();
        const total = unitPrice * quantity;
        try {
            const response = await fetch('http://localhost/static/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: formattedDate,
                    ordername: orderName,
                    name: itemName,  // Corrected here
                    unit_price: parseFloat(unitPrice),
                    quantity: parseInt(quantity),
                    total: total,

                }),
            });

            const data = await response.json();
            setApiResponse(data);

            // Clear the input fields and focus on the item name input
            setItemName('');
            setUnitPrice('');
            setQuantity('');
            itemNameRef.current.focus();
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="App">
            <h1>React API Integration</h1>
            <form onSubmit={handleAddItem}>
                <div className='container py-5'>
                    <h4>Date: {formattedDate}</h4>
                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Order Name"
                                value={orderName}
                                onChange={(e) => setOrderName(e.target.value)}

                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                ref={itemNameRef}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                placeholder="Unit Price"
                                value={unitPrice}
                                onChange={(e) => setUnitPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary">Add Item</button>
                        </div>
                    </div>
                </div>
            </form>

            {apiResponse && (
                <div className="response">
                    <h3>API Response:</h3>
                    <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
