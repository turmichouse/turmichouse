import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import format from 'date-fns/format';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import './global.css'
registerLocale('en-GB', enGB);
const CustomDatePickerInput = ({ value, onClick }) => (
    <button className="custom-date-picker form-control" onClick={onClick}>
        {value}
    </button>
);
export default function Header({
    name, emailAddress, setEmailAddress,
    changeSoldName,
    phone,
    changePhone,
    deliveryTo,
    setDeliveryTo,
    setDateHeader,
    selectedDate,
    selectedEventDate,
    onDateeventChange, selectedTime, selectedAmPm,
    timeOptions, handleTimeChange, handleAmPmChange, changeOrderType, clearAllDataHeader, orderType }) {
    return (
        <div className='row'>
            <div className='col-md-3'>
                <div className='row'>

                    <div className="col-md-12">
                        <h6>Sold to:</h6>
                        <input type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={changeSoldName} />

                        <input type="text"
                            className="form-control mt-2"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => changePhone(e.target.value)} />

                        <input type="email"
                            className="form-control mt-2"
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)} />
                    </div>
                </div>

            </div>
            <div className='col-md-3'>
                <div className='row'>
                    <h6>Order Tye</h6>
                    <div className='row'>

                        <div className="col-md-12">
                            <select value={orderType} className="form-control" onChange={changeOrderType}>
                                <option value="PickUp">Pickup </option>
                                <option value="Delivery">Delivery </option>
                            </select>
                        </div>
                    </div>

                    {orderType === 'Delivery' &&
                        <div className="col-md-12">
                            <h6 className='mt-2'>  Deliver to:</h6>
                            <textarea type="text"
                                className="form-control "
                                placeholder="Delivery To"
                                value={deliveryTo}
                                onChange={(e) => setDeliveryTo(e.target.value)} />


                        </div>
                    }

                </div>

            </div>

            <div className='col-md-6'>
                <h6>Event Information</h6>
                <div className='row'>
                    <div className="col-md-5">
                        <p>  Date:</p>
                    </div>
                    <div className="col-md-7">

                        <input className="form-control mb-2"
                            type="date"
                            id="dateInput"
                            value={selectedDate}
                            onChange={(e) => setDateHeader(e.target.value)}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-4">
                        Event Date:
                    </div>
                    <div className="col-md-7">

                        <DatePicker
                            className='form-control mb-2'
                            selected={selectedEventDate}
                            onChange={onDateeventChange}
                            dateFormat="EEEE, MMMM d, yyyy"
                            locale="en-GB"
                        />

                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-5">
                        Pick-Up/Deliver By Time:
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-6">
                                <select value={selectedTime} className="form-control" onChange={handleTimeChange}>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select></div>
                            <div className="col-md-6">
                                <select value={selectedAmPm} className="form-control" onChange={handleAmPmChange}>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select></div>


                        </div>
                        <p>Selected Time: {selectedTime} {selectedAmPm}</p></div>
                </div>


            </div>
            <div className='row'>
                <div className='col-md-4'> <button onClick={clearAllDataHeader} style={{ width: '100 %' }} className="btn btn-success">Clear All</button></div></div>



        </div>
    )
}
