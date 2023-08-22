import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoImage from './logo/logo.png'; // Adjust the path accordingly
const PDFDocument = ({
    soldtoName,
    soldtoPhone,
    deliveryTo,
    selectedDate,
    selectedEventDate,
    selectedTime,
    selectedAmPm,
    orderType,
    items,
    orderDate,
    footerNote,
    emailAddress,
    orderNumber, tipsCat, deliveryFee, tax

}) => {
    const grandSubTotal = items.length > 0 ? items.reduce((total, item) => total + item.total, 0) : 0;
    // Calculate tip amount based on tipsCat

    // Convert tipsCat to a number if it's a valid number
    const tipsCatAsNumber = parseFloat(tipsCat);
    const validTipsCat = isNaN(tipsCatAsNumber) ? 0 : tipsCatAsNumber;

    const taxNumber = parseFloat(tax);
    const validTax = isNaN(taxNumber) ? 0 : taxNumber;

    const taxAmount = (grandSubTotal * validTax) / 100;




    const deliveryfeeNumber = parseFloat(deliveryFee);
    const valiDeliveryFee = isNaN(deliveryfeeNumber) ? 0 : deliveryfeeNumber;
    const finalDelivery = valiDeliveryFee;
    const grandTotal = grandSubTotal + validTipsCat + finalDelivery + taxAmount;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.centeredView}>
                    <Image src={logoImage} style={[styles.logoImage, { marginBottom: 10 }]} />                </View>

                <View style={styles.headerSesction}>
                    <View style={styles.headerSection}>
                        <View style={[styles.column, styles.column1]}>
                            {soldtoName && <Text style={[styles.header]}>Sold to: {soldtoName}</Text>}
                            {soldtoPhone && <Text style={[styles.header]}>Phone: {soldtoPhone}</Text>}
                            {emailAddress && <Text style={[styles.header]}>
                                Email: {emailAddress}</Text>}

                        </View>
                        <View style={[styles.column, styles.column2]}>
                            {orderType && <Text style={[styles.header]}>Order Type: {orderType}</Text>}
                            {deliveryTo && <Text style={[styles.header]}>Deliver to: {deliveryTo}</Text>}
                        </View>
                        <View style={[styles.column, styles.column3]}>
                            {selectedDate && <Text style={[styles.header]}>Date: {selectedDate}</Text>}
                            {selectedEventDate && (
                                <Text style={[styles.header]}>
                                    Event date: {selectedEventDate.toDateString()}
                                </Text>
                            )}
                            {selectedTime && (
                                <Text style={[styles.header]}>
                                    Pick-Up/Deliver By Time: {selectedTime} {selectedAmPm}
                                </Text>
                            )}
                        </View>
                    </View>


                    <Text style={styles.header}>Invoice date: {orderDate} || Order Number: {orderNumber}</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Unit Price</Text>
                            <Text style={styles.tableHeader}>Total</Text>
                        </View>
                        {items.map((item, index) => (
                            <View key={index}>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{item.itemName}</Text>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                                    <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
                                </View>
                                <View
                                    style={[styles.fullWidthDescription, styles.tableRow]}>
                                    <Text style={[styles.fullWidthDescriptionText,
                                    styles.tableCellss,
                                    styles.tableCellNoBorder]}>
                                        Special Instruction: {item.itemDescription}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandSubLabel}>Sub Total:</Text>
                        <Text style={styles.grandsubValue}>${grandSubTotal.toFixed(2)}</Text>
                    </View>
                    {
                        validTipsCat !== 0 && <View style={styles.grandTotalRow}>
                            <Text style={styles.grandSubLabel}>Catering Tip:</Text>
                            <Text style={styles.grandsubValue}>${tipsCat}</Text>
                        </View>
                    }
                    {
                        finalDelivery !== 0 && <View style={styles.grandTotalRow}>
                            <Text style={styles.grandSubLabel}>Delivery Fee:</Text>
                            <Text style={styles.grandsubValue}>${deliveryfeeNumber}</Text>
                        </View>
                    }
                    {
                        validTax !== 0 && <View style={styles.grandTotalRow}>
                            <Text style={styles.grandSubLabel}>Tax {taxNumber}%:</Text>
                            <Text style={styles.grandsubValue}>${taxAmount}</Text>
                        </View>
                    }
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total:</Text>
                        <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.grandTotalRow}>
                        {footerNote && <Text style={[styles.grandTotalLabels]}>
                            Special Note: {footerNote}</Text>}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
const styles = StyleSheet.create({
    headerSesction: { marginTop: '6rem' },
    page: { padding: 20 },
    header: { fontSize: '10px', marginBottom: 10 },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70rem',
        height: '70rem',
        marginHorizontal: 'auto',
        marginBottom: 20

    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    table: {
        display: 'table',
        width: '100%',
        marginBottom: 10,
    },
    tableCellNoBorder: {
        width: '100%',
        padding: 5,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        fontSize: 10,
        borderRightWidth: 0, // Remove right border
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    }, fullWidthDescription: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    },
    headerSection: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    column: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    column1: {
        width: '30%', // Adjust the width as needed
    },
    column2: {
        width: '40%', // Adjust the width as needed
    },
    column3: {
        width: '30%', // Adjust the width as needed
    },

    fullWidthDescriptionText: {
        width: '100%',
        padding: 5,
        fontSize: 10,
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
        fontSize: 10
    },
    tableCell: {
        width: '30%',
        padding: 5,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
        borderLeftWidth: 1,
        borderleftColor: '#000',
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid', whiteSpace: 'nowrap', // Prevent text wrapping
        fontSize: '10px'
    },
    tableCellss: {
        width: '100%',
        padding: 5,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
        borderLeftWidth: 1,
        borderleftColor: '#000',
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid', whiteSpace: 'nowrap', // Prevent text wrapping
        fontSize: '10px'
    },
    removeButton: {
        cursor: 'pointer',
        color: 'red',
        textDecoration: 'underline',
    },
    grandTotalLabels: {
        width: '100%',
        textAlign: 'left',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    grandTotalRow: {
        flexDirection: 'row',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
        borderTopStyle: 'solid',
        paddingTop: 5,
    },
    grandSubLabel: {
        fontSize: 12,
        width: '80%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    grandsubValue: {
        fontSize: 12,
        width: '20%',
        textAlign: 'center',
        fontWeight: 'bold',
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

export default PDFDocument;
