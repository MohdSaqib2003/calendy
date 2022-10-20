import React, { useState, useEffect, createElement, useRef } from 'react'
import { DatePicker, Space, message, List } from 'antd';
import moment from 'moment';
import axios from 'axios';

const token = 'ya29.a0Aa4xrXNgSot3t0ufVzQtPX-W6cfMOboQDCPDmHQKc6uDoHNrcPMbb7xQ0kmZ0rgq7NERQEhEq5jWYTNxANWokoqB8ZvR74wU5K0smk7HZ1oMRpQZndukhgGSkdkgTcWE5n_gJ4scZb2qariTClIOREeMmo_NhAaCgYKATASARISFQEjDvL92GR6soL9wdojfpcQQQtINg0165';

const Admin = () => {
    const { RangePicker } = DatePicker;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [temp, setTemp] = useState("Good");

    const onChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            setStartDate(moment(dates[0]).format());
            setEndDate(moment(dates[1]).format());
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };

    // const setAvailableDate = () => {
    //     if (startDate && endDate) {

    //         var data = JSON.stringify({
    //             start: {
    //                 dateTime: startDate
    //             },
    //             end: {
    //                 dateTime: endDate
    //             },
    //             description: "This is description by Saqib",
    //             summary: "SaqibAvailable"
    //         })
    //         var config = {
    //             method: 'post',
    //             url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'text/plain'
    //             },
    //             data: data
    //         };

    //         axios(config).then((response) => {
    //             console.log("Response : ", response);
    //         }).catch((err) => {
    //             console.log("Error : ", err);
    //         })

    //     } else {
    //         message.warn("Pls select Date")
    //     }
    // }

    const setAvailableDate = () => {
        if (startDate && endDate) {
            const payload = [startDate, endDate];
            axios.post(`http://localhost:3000/api/setAvailable`, payload).then((res) => {
                console.log("POST DATA : ", res);
            }).catch((err) => {
                console.log("Err : ", err);
            })
        }
    }



    console.log("DATE START : ", startDate, " -- ", endDate);
    
    const fun = ()=>{
        setTemp(null);
    }

    return (
        <div style={{ border: '1px solid black' }}>
            <h2>Set Availability</h2>
            <button onClick={fun}>click</button>
            <div>
                Select Date :
                <Space direction="vertical" size={12}>
                    <RangePicker
                        ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        onChange={onChange}
                    />
                </Space>
                <button onClick={setAvailableDate}>Set</button>
            </div>
        </div>
    )
}

export default Admin;