import React, { useState, useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

import 'bootstrap/dist/css/bootstrap.min.css';

function Form() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showPDF, setShowPDF] = useState(false); // Track PDF display state
    const itemNameRef = useRef(null); // Ref for the Item Name input
    // ... (other state and functions)


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        itemNameRef.current.focus(); // Move focus to the Item Name input
        const newItem = {
            itemName,
            unitPrice: parseFloat(unitPrice),
            quantity: parseInt(quantity),
        };
        newItem.total = newItem.unitPrice * newItem.quantity;
        setItems([...items, newItem]);
        setItemName('');
        setUnitPrice('');
        setQuantity('');
        setShowPDF(false); // Hide PDF when new item is added
    };

    // Handle item removal
    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };
    const PDFDocument = () => {
        const grandTotal = items.reduce((total, item) => total + item.total, 0);

        return (
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.header}>Invoice</Text>
                    <View>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableHeader}>Item Name</Text>
                                <Text style={styles.tableHeader}>Quantity</Text>
                                <Text style={styles.tableHeader}>Unit Price</Text>
                                <Text style={styles.tableHeader}>Total</Text>
                            </View>
                            {items.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item.itemName}</Text>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                                    <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.grandTotalRow}>
                            <Text style={styles.grandTotalLabel}>Grand Total:</Text>
                            <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );
    };



    // Render the form, list of items, and PDF viewer
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='container py-5'>
                    <div className="row ">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                ref={itemNameRef} // Attach the ref here
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
                    </div></div>
            </form>
            {items.length > 0 && (
                <div className='container'>
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
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemName}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.unitPrice.toFixed(2)}</td>
                                    <td>${item.total.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => setShowPDF(!showPDF)} className="btn btn-success">Generate PDF</button>
                    {showPDF && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Generated PDF:</h2>
                            <PDFViewer style={{ width: '100%', height: '500px' }}>
                                <PDFDocument />
                            </PDFViewer>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = StyleSheet.create({
    page: { padding: 20 },
    header: { fontSize: 24, marginBottom: 10 },
    table: {
        display: 'table',
        width: '100%',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    },
    tableHeader: {
        width: '30%',
        padding: 5,
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderRightColor: '#000',
        borderRightStyle: 'solid',
    },
    tableCell: {
        width: '30%',
        padding: 5,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
        borderRightStyle: 'solid', whiteSpace: 'nowrap', // Prevent text wrapping
        fontSize: '10px'
    },
    removeButton: {
        cursor: 'pointer',
        color: 'red',
        textDecoration: 'underline',
    }, grandTotalRow: {
        flexDirection: 'row',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
        borderTopStyle: 'solid',
        paddingTop: 5,
    },
    grandTotalLabel: {
        width: '80%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    grandTotalValue: {
        width: '20%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Form;
