import React, { useState, useEffect, createElement, useRef } from 'react'
import { DatePicker, Space, message, List, Button, TimePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import AdminAvailable from './adminAvailable';

const token = 'ya29.a0Aa4xrXNgSot3t0ufVzQtPX-W6cfMOboQDCPDmHQKc6uDoHNrcPMbb7xQ0kmZ0rgq7NERQEhEq5jWYTNxANWokoqB8ZvR74wU5K0smk7HZ1oMRpQZndukhgGSkdkgTcWE5n_gJ4scZb2qariTClIOREeMmo_NhAaCgYKATASARISFQEjDvL92GR6soL9wdojfpcQQQtINg0165';

const Admin = () => {
    const { RangePicker } = DatePicker;
    const [selectDate, setSelectDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [addedStatus, setAddedStatus] = useState(false);
    const [selectTime, setSelectTime] = useState(null);

    const setAvailableDate = () => {
        if (startDate && endDate) {
            const payload = [startDate, endDate];
            axios.post(`http://localhost:3000/api/setAvailable`, payload).then((res) => {
                console.log("POST DATA : ", res);
                message.success("Added")
                setAddedStatus(true);
                setSelectDate(null);
            }).catch((err) => {
                console.log("Err : ", err);
            })
            setAddedStatus(false);
        } else {
            message.warn("please select date")
        }
    }

    const onSelectDate = (dates) => {
        console.log("Date : ", dates);
        setSelectDate(moment(dates?._d).format("DD/MM/YYYY"));
    }

    const onSelectTime = (time, timeString) => {
        console.log("Time : ", time);

        const tempStartDateTime = moment(selectDate + timeString[0], 'DD/MM/YYYY HH:mm').format();
        const tempEndDateTime = moment(selectDate + timeString[1], 'DD/MM/YYYY HH:mm').format();

        setStartDate(tempStartDateTime);
        setEndDate(tempEndDateTime);
        setSelectTime(timeString);
        console.log("Time string : ",timeString);
    }

    console.log("DATE START : ", startDate, " -- ", endDate);

    const disabledDate = (current) => {
        // Can not select days before today and today
        let customDate = moment().format("YYYY-MM-DD");
        // console.log("Current : ", current);
        // console.log("Custom : ", customDate);
        return current && current < moment(customDate, "YYYY-MM-DD");
    }

    return (
        <div style={{ border: '1px solid black' }}>
            <h2>Admin</h2>

            <div style={{ border: '2px solid black' }}> <br />
                <h3>when are you available?</h3>
                Select Date :
                <Space direction="horizontal" size={12} >

                    <DatePicker onChange={onSelectDate} allowClear={false} disabledDate={disabledDate}  
                    value={selectDate ? moment(selectDate, "YYYY-MM-DD") : ""} 
                    format={'YYYY-MM-DD'}
                    
                    />
                    
                    {/* <DatePicker onChange={onSelectDate} allowClear={false} disabledDate={disabledDate}/> */}

                    <TimePicker.RangePicker onChange={onSelectTime} disabled={selectDate ? false : true} allowClear={false} />

                    <Button type='primary' onClick={setAvailableDate}>Add</Button>
                </Space> <br /> <br />
            </div> <br />
            <AdminAvailable addedStatus={addedStatus} />
        </div>
    )
}

export default Admin;