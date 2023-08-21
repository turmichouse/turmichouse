import React, { useState, useRef } from 'react';
import List from './List';
import InputForm from './Input';
import PDFDocument from './Pdf'
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import logoImage from './logo/logo.png'; // Adjust the path accordingly
function Form() {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showPDF, setShowPDF] = useState(false); // Track PDF display state
    const itemNameRef = useRef(null); // Ref for the Item Name input
    const [footerNote, setFooterNote] = useState('');
    const [orderDate, setDate] = useState('');


    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // const [showPicker, setShowPicker] = useState(true);

    //header
    const [soldtoName, setSoldtoName] = useState('');
    const [soldtoPhone, setSoldtoPhone] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [deliveryTo, setDeliveryTo] = useState('');
    const [selectedTime, setSelectedTime] = useState(getDefaultTime());
    const [selectedAmPm, setSelectedAmPm] = useState('AM');
    const [orderType, setOrderType] = useState('PickUp');
    const [setDateheader, setDateHeader] = useState('');
    const [selectedEventDate, setSelectedEventDate] = useState(null);
    const [incremnt, setIncrement] = useState(1);
    const [orderNumber, setOrderNumber] = useState(''); // Initialize order number
    const [tipsCat, setCatTips] = useState('0');

    function getDefaultTime() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setSelectedTime(newTime);
    };

    const handlesetCatTips = (value) => {
        const tipAount = parseFloat(value);
        setCatTips(tipAount); // Convert the string to a number

    };


    const handleAmPmChange = (event) => {
        const newAmPm = event.target.value;
        setSelectedAmPm(newAmPm);
    };
    const handleDateeventChange = (date) => {
        setSelectedEventDate(date);
    };
    const timeOptions = [
        '12:00', '12:30',
        '1:00', '1:30',
        '2:00', '2:30',
        '3:00', '3:30',
        '4:00', '4:30',
        '5:00', '5:30',
        '6:00', '6:30',
        '7:00', '7:30',
        '8:00', '8:30',
        '9:00', '9:30',
        '10:00', '10:30',
        '11:00', '11:30'
    ];


    const changeSoldName = (e) => {
        setSoldtoName(e.target.value);
    }
    const handleDateChange = (date) => {
        setSelectedEventDate(date);
        // setShowPicker(false);
    };
    const changeOrderType = (e) => {
        const ordertype = e.target.value;
        setOrderType(ordertype);
    }

    const clearAllDataHeader = () => {
        setSoldtoName('');
        setSoldtoPhone('');
        setDeliveryTo('');
        setSelectedTime(getDefaultTime());
        setSelectedAmPm('AM');
        setOrderType('Pickup');
    }

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const formattedDateTime = currentDate.toLocaleDateString(undefined, options);
        return formattedDateTime;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        itemNameRef.current.focus(); // Move focus to the Item Name input
        const newItem = {
            itemName,
            unitPrice: parseFloat(unitPrice),
            quantity: parseInt(quantity),
            itemDescription
        };
        newItem.total = newItem.unitPrice * newItem.quantity;
        setItems([...items, newItem]);
        const submissionDateTime = getCurrentDateTime();
        setDate(submissionDateTime);

        setItemName('');
        setUnitPrice('');
        setQuantity('');
        setItemDescription('');
        setShowPDF(false); // Hide PDF when new item is added
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours}${minutes}`;

        setIncrement((increment) => increment + 1);

        const combinedOrderNumber = `TuHou${formattedTime}${incremnt}`;

        setOrderNumber(combinedOrderNumber);


    };

    // Handle item removal
    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };


    // Render the form, list of items, and PDF viewer
    return (
        <div className='container'>
            <div className='logo' style={{ textAlign: 'center', filter: 'brightness(0) invert(1)', marginBottom: '2rem' }}>
                <img
                    src={logoImage}
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: '100px' }}
                /></div>
            <Header
                emailAddress={emailAddress}
                setEmailAddress={setEmailAddress}
                name={soldtoName}
                changeSoldName={changeSoldName}
                phone={soldtoPhone}
                changePhone={setSoldtoPhone}
                deliveryTo={deliveryTo}
                setDeliveryTo={setDeliveryTo}
                selectedDate={setDateheader}
                setDateHeader={setDateHeader}
                selectedEventDate={selectedEventDate}

                onDateeventChange={handleDateeventChange}
                selectedTime={selectedTime}
                selectedAmPm={selectedAmPm}
                handleTimeChange={handleTimeChange}
                timeOptions={timeOptions}
                handleAmPmChange={handleAmPmChange}
                changeOrderType={changeOrderType}
                clearAllDataHeader={clearAllDataHeader}
                orderType={orderType}



            />
            <div style={{ height: '3px', width: '100%', backgroundColor: 'white', marginTop: '1rem' }}></div>

            <InputForm formattedDate={formattedDate}
                itemName={itemName}
                itemDescription={itemDescription}
                unitPrice={unitPrice}
                quantity={quantity}
                setItemName={setItemName}
                setItemDescription={setItemDescription}
                setUnitPrice={setUnitPrice}
                setQuantity={setQuantity}
                handleSubmit={handleSubmit} footerNote={footerNote}
                setFooterNote={setFooterNote}
                itemNameRef={itemNameRef} // Pass the itemNameRef here

                tipsCat={tipsCat}
                handlesetCatTips={handlesetCatTips}
            />

            {items.length > 0 && (
                <div className='container'>
                    <List data={items} orderDate={orderDate} removeItem={handleRemoveItem} orderNumber={orderNumber} />
                    <button onClick={() => setShowPDF(!showPDF)} className="btn btn-success">Generate PDF</button>
                    <button className="btn btn-success" style={{ marginLeft: '2rem' }} onClick={() => setItems([])}>Remove All</button>

                    {showPDF && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Generated PDF:</h2>
                            <PDFViewer style={{ width: '100%', height: '500px' }}>
                                <PDFDocument soldtoName={soldtoName}
                                    emailAddress={emailAddress}
                                    soldtoPhone={soldtoPhone}
                                    deliveryTo={deliveryTo}
                                    selectedDate={setDateheader}
                                    selectedEventDate={selectedEventDate}
                                    selectedTime={selectedTime}
                                    selectedAmPm={selectedAmPm}
                                    orderType={orderType}
                                    itemDescription={itemDescription}
                                    footerNote={footerNote}
                                    tipsCat={tipsCat}
                                    items={items} orderDate={orderDate} orderNumber={orderNumber} />
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
    header: { fontSize: 18, marginBottom: 10 },
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
