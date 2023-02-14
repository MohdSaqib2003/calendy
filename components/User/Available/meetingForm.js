import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const zoomToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkM0YW8tU2VWUTZtb3hDa3ZFX1pfclEiLCJleHAiOjE5MTk4NDY0NjAsImlhdCI6MTY2NzM4MTA3NX0.9IFsudfKrrt0kdshamJm4wlY1o1ULHmtDohvdDAqDx4";

const googleToken = 'ya29.a0Aa4xrXM1bj-1ANxFsAZ3bDGHlJZRRT2W9Zh8pEarpHzVCwdUVQYID2B3cHK3Bp5z8NZDz1q-R8HkKg2xIbOnoQPuZzsUt9Hi_PUpyUPj5zElJNKVl6HsR9Fse3CzeBLoLTWMmM-QAhefuePuW5sCTiCFTzBwBgaCgYKATASARISFQEjDvL9_ZrvCHnXTQ3zVw62dI7iAA0165';


function diff_minutes(dt2, dt1) {
    console.log(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

const MeetingForm = ({ freeSlot, isModalOpen, setIsModalOpen, setMeetingDetails }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [zoomResponse, setZoomResponse] = useState(null);
    const [addEventReponse, setAddEventReponse] = useState(null);

    const [form] = Form.useForm();



    useEffect(() => {
        if (formData !== null) {
            const duration = diff_minutes(new Date(freeSlot[1]), new Date(freeSlot[0]));

            const zoomPayload = JSON.stringify({
                topic: formData?.topic,
                type: 2,
                start_time: freeSlot[0],
                duration: duration,
                timezone: "Asia/Calcutta",
                settings: {
                    "registrants_email_notification": true
                }
            })

            var zoomConfig = {
                method: 'post',
                url: 'https://api.zoom.us/v2/users/me/meetings',
                headers: {
                    'Authorization': `Bearer ${zoomToken}`,
                    'Content-Type': 'application/json',
                },
                data: zoomPayload
            };

            axios.post(`http://localhost:3000/api`, zoomConfig).then((res) => {
                console.log(res, "data from zoom");

                setZoomResponse(res?.data?.data)
            }).catch((err) => {
                console.log("Err : ", err);
                message.error("failed ");
            })
            console.log("ZOOM CONFIG : ", zoomPayload);
        }
    }, [formData])

    useEffect(() => {
        if (zoomResponse !== null) {
            const addEventPayload = JSON.stringify({
                start: {
                    dateTime: freeSlot[0]
                },
                end: {
                    dateTime: freeSlot[1]
                },
                description: `${formData?.description} \n zoom_url : ${zoomResponse?.join_url}`,
                summary: "Topic",
                attendees: [{ "email": "saqib.m@opensenselabs.com" }, { "email": formData?.email }],
                id: zoomResponse?.id
            })

            const addEventConfig = {
                method: 'post',
                url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
                headers: {
                    'Authorization': `Bearer ${googleToken}`,
                    'Content-Type': 'application/json'
                },
                data: addEventPayload
            }

            axios(addEventConfig).then((res) => {
                setIsModalOpen(false);
                message.success("Meeting has been added succesfully");
                setMeetingDetails(zoomResponse);
                ["2022-11-03T05:00:00+05:30","2022-11-03T06:00:00+05:30"];
                
                setAddEventReponse(res?.data);
                    axios.post(`http://localhost:3000/api/deleteSlot`,  JSON.stringify(freeSlot)).then((res) => {
                        console.log("SUCCES", res);
                        // setDeleteLoading(false);
                    }).catch((err) => {
                        // setDeleteLoading(false);
                        console.log("Err : ", err);
                    })
                console.log("Response : ", res);
            }).catch((err) => {
                message.error("failed ");
                console.log("error : ", err);
            })
        }
    }, [zoomResponse]);

    const onFinish = (values) => {
        console.log('Success:', values);
        setFormData(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log("FreeSlot : ", freeSlot);
    console.log("Zoom reposnse  : ", zoomResponse);

    return (<>

        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="Topic"
                name="topic"
                rules={[
                    {
                        required: true,
                        message: 'Please input topic!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    );
};
export default MeetingForm;