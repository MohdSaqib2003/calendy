import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import SetModal from './SetModal';
import { DatePicker, List, Space } from 'antd';

const token = 'ya29.a0Aa4xrXMld9GwTJVj2E8S5pDNIW4y92f-etA0f0aR_4_jsrMbU-SG8Vqe7w3uXgYRYRrADiu3LnIz1sQ4ijqmZcas9p_e85iwD9twaR2g-2C7RUBKrTFzT6bunEGvVGOl0VQJSesVCagitwQe5dmdF_lx2PL_EAaCgYKATASARISFQEjDvL9qU0wHuaHNeePx0fkIry2lA0165';


function diff_minutes(dt2, dt1) {
    console.log(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

const Available = () => {
    const [freeSlots, setFreeSlots] = useState([]);
    const [allSlots, setAllSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/getAvailable`).then((res) => {
            console.log("get DATA : ", res?.data);
            setAllSlots(res?.data?.slots);
            console.log("get DATA slots : ", res?.data?.slots);
        }).catch((err) => {
            console.log("Err : ", err);
        })

        const currentDate = new Date();
        console.log("CurrentDate : ", currentDate)
    }, [])

    useEffect(() => {
        if (allSlots?.length > 0) {
            const currentDate = new Date();
            setSelectedDate(moment(currentDate).format("DD-MM-YYYY"))
            console.log("CurrentDate : ", currentDate)
        }
    }, [allSlots])


    

    // useEffect(() => {

    //     var config = {
    //         method: 'get',
    //         url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=2022-10-17T05:21:28.000Z&timeMax=2023-10-25T05:21:28.000Z&singleEvents=true&orderBy=startTime',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     };

    //     axios(config).then(function (response) {
    //         console.log(response.data);
    //         const events = response?.data?.items;
    //         console.log(events);

    //         const freeTemp = events?.filter((event) => {
    //             const tempStart = moment(event?.start?.dateTime).format("DD-MM-YYYY");
    //             const tempEnd = moment(event?.end?.dateTime).format("DD-MM-YYYY");

    //             if (event?.summary === "SaqibAvailable" && tempStart === selectedDate || tempEnd === selectedDate) {
    //                 return [event?.start?.dateTime, event?.end?.dateTime];
    //             }
    //         })?.map((event) => {
    //             return [event?.start?.dateTime, event?.end?.dateTime];
    //         });
    //         setFreeSlots(freeTemp);

    //     }).catch(function (error) {
    //         console.log(error);
    //     });

    // }, [selectedDate])


    useEffect(() => {

        const freeTemp = allSlots?.filter((slot) => {
            const tempStart = moment(slot[0]).format("DD-MM-YYYY");
            const tempEnd = moment(slot[1]).format("DD-MM-YYYY");

            if (tempStart === selectedDate) {
                return [slot[0], slot[1]];
            }
        })?.map((slot2) => {
            return [slot2[0], slot2[1]];
        });
        setFreeSlots(freeTemp);

    }, [selectedDate])

    const onSelectDateChange = (data) => {
        setSelectedDate(moment(data?._d).format("DD-MM-YYYY"));
    }

    return (
        <div>
          
            <h2>Schedule Meeting</h2>
            <div>
                <span>Choose Date : </span>
                <Space direction="vertical">
                    <DatePicker onChange={onSelectDateChange} defaultValue={moment()} clearIcon={<></>} />
                </Space>
            </div>

            <div>

                <div>
                    Available slots on {selectedDate}
                </div>

            {freeSlots?.map((freeSlot) => {
                return <List.Item style={{ border: '1px solid blue', margin: '5px' }}> {moment(freeSlot[0]).format("HH:mm")}  -  {moment(freeSlot[1]).format("HH:mm")}  <SetModal freeSlot={freeSlot} /></List.Item>
            })}
            </div>
        </div>
    )
}
export default Available;