import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import SetModal from './SetModal';
import { DatePicker, Space } from 'antd';

const token = 'ya29.a0Aa4xrXNgSot3t0ufVzQtPX-W6cfMOboQDCPDmHQKc6uDoHNrcPMbb7xQ0kmZ0rgq7NERQEhEq5jWYTNxANWokoqB8ZvR74wU5K0smk7HZ1oMRpQZndukhgGSkdkgTcWE5n_gJ4scZb2qariTClIOREeMmo_NhAaCgYKATASARISFQEjDvL92GR6soL9wdojfpcQQQtINg0165';


function diff_minutes(dt2, dt1) {
    console.log(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

const Available = () => {
    const [freeSlots, setFreeSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const add = ()=>{
        axios.post(`http://localhost:3000/api/setAvailable`).then((res) => {
            console.log("POST DATA : ",res);
        }).catch((err) => {
            console.log("Err : ", err);
        })
    }

    useEffect(() => {

        var config = {
            method: 'get',
            url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=2022-10-17T05:21:28.000Z&timeMax=2023-10-25T05:21:28.000Z&singleEvents=true&orderBy=startTime',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config).then(function (response) {
            console.log(response.data);
            const events = response?.data?.items;
            console.log(events);
            const freeTemp = events?.filter((event) => {
                const tempStart = moment(event?.start?.dateTime).format("DD-MM-YYYY")
                if (event?.summary === "SaqibAvailable" && tempStart === selectedDate) {
                    return [event?.start?.dateTime, event?.end?.dateTime];
                }
            })?.map((event) => {
                return [event?.start?.dateTime, event?.end?.dateTime];
            });
            setFreeSlots(freeTemp);

        }).catch(function (error) {
            console.log(error);
        });

    }, [selectedDate])

    console.log('Freee Slots : ', freeSlots);
    const onSelectDateChange = (data)=>{
        setSelectedDate(moment(data?._d).format("DD-MM-YYYY"));
    }
    console.log("SelectedDate : ", selectedDate);

    const d1 = moment("2022-10-22T08:00:00+05:30").format("DD-MM-YYYY");
    const d2 = moment("2022-10-25T18:00:00+05:30").format("DD-MM-YYYY");

    console.log("Same d1 : ",typeof d1 );
    console.log("Same d2 : ",typeof d2 );

    return (
        <div style={{ border: '1px solid black' }}>Available
        <button onClick={add}>Add</button>
            <Space direction="vertical">
                <DatePicker onChange={onSelectDateChange} clearIcon={<></>}/>
            </Space>
            <ul>
                {freeSlots?.map((freeSlot) => {
                    return <li style={{ border: '1px solid blue', margin: '5px' }}> {moment(freeSlot[0]).format("HH:mm")}  -  {moment(freeSlot[1]).format("HH:mm")}  <SetModal freeSlot={freeSlot} /></li>
                })}
            </ul>
        </div>
    )
}
export default Available;