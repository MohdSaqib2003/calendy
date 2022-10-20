// import React, { useState, useEffect, createElement } from 'react'
// import { DatePicker, Space, message, List } from 'antd';
// import moment from 'moment';
// import axios from 'axios';

// const token = 'ya29.a0Aa4xrXNgSot3t0ufVzQtPX-W6cfMOboQDCPDmHQKc6uDoHNrcPMbb7xQ0kmZ0rgq7NERQEhEq5jWYTNxANWokoqB8ZvR74wU5K0smk7HZ1oMRpQZndukhgGSkdkgTcWE5n_gJ4scZb2qariTClIOREeMmo_NhAaCgYKATASARISFQEjDvL92GR6soL9wdojfpcQQQtINg0165';


// const Admin = () => {
//     const { RangePicker } = DatePicker;
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);

//     const onChange = (dates, dateStrings) => {
//         if (dates) {
//             console.log('From: ', dates[0], ', to: ', dates[1]);
//             setStartDate(moment(dates[0]).format());
//             setEndDate(moment(dates[1]).format());
//             console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
//         } else {
//             console.log('Clear');
//         }
//     };

//     const setAvailableDate = () => {
//         if (startDate && endDate) {

//             var data = JSON.stringify({
//                 start: {
//                     dateTime: startDate
//                 },
//                 end: {
//                     dateTime: endDate
//                 },
//                 description: "This is description by Saqib",
//                 summary: "SaqibAvailable"
//             })
//             var config = {
//                 method: 'post',
//                 url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'text/plain'
//                 },
//                 data: data
//             };

//             axios(config).then((response) => {
//                 console.log("Response : ", response);
//             }).catch((err) => {
//                 console.log("Error : ", err);
//             })

//         } else {
//             message.warn("Pls select Date")
//         }
//     }

//     return (
//         <div style={{ border: '1px solid black' }}>
//             <h2>Set Availability</h2>
//             <div>

//                 Select Date :
//                 <Space direction="vertical">
//                     <DatePicker onChange={onChange} clearIcon={<></>} />
//                 </Space>
//                 <button onClick={setAvailableDate}>Set</button>
//                 <List>
//                     {oneHourDuration?.map((item) => <List.Item>{item}: 00 - {item+1}:00</List.Item>)}
//                 </List>
//             </div>
//         </div>
//     )
// }

// export default Admin;













