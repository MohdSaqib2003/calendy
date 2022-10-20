import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

const zoomToken = "eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiI1ZDBjZTcxOS01YjJiLTQzMjItOWQ1MC1kNmY5NDJmYjY1ZWEifQ.eyJ2ZXIiOjcsImF1aWQiOiI1OTI5ZjI0NzNhYWU3NzIwMzc0OGU1NTMyNTQ0ZTk2NiIsImNvZGUiOiJ3YmF4ZXpnOUJ3UGZSeTRWMzZBVGJteG9NOFFxbWsxVnciLCJpc3MiOiJ6bTpjaWQ6Y05LUThPeUZTVEpRd0plSmhHRkd3IiwiZ25vIjowLCJ0eXBlIjowLCJ0aWQiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsInVpZCI6IkF6NHhfamNqUmdXQ2dzY0pfV1pwN1EiLCJuYmYiOjE2NjYxODAxNzYsImV4cCI6MTY2NjE4Mzc3NiwiaWF0IjoxNjY2MTgwMTc2LCJhaWQiOiJkUk85NGJhSVJtaXhnNDdEeXczTUhBIiwianRpIjoiZWVjNDQwMmQtZDEzMy00NTA1LWI1MTMtNDI1ZjdiNjlhYjYxIn0.0YUwxrt4XvB8iZobtTB5AdnyNnwypjH400_drzXviiyPsy_AMfRpRpKAUnfhamptznffCSgfGienBMPZFo5qfA";

const token = 'ya29.a0Aa4xrXNgSot3t0ufVzQtPX-W6cfMOboQDCPDmHQKc6uDoHNrcPMbb7xQ0kmZ0rgq7NERQEhEq5jWYTNxANWokoqB8ZvR74wU5K0smk7HZ1oMRpQZndukhgGSkdkgTcWE5n_gJ4scZb2qariTClIOREeMmo_NhAaCgYKATASARISFQEjDvL92GR6soL9wdojfpcQQQtINg0165';


function diff_minutes(dt2, dt1) {
    console.log(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

const MeetingForm = ({ freeSlot, isModalOpen ,setIsModalOpen }) => {
    const [formData, setFormData] = useState(null);
    const [zoomResponse, setZoomResponse] = useState(null);
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
                      'Authorization': `Bearer ${token}`, 
                      'Content-Type': 'application/json'
                    },
                    data : addEventPayload
            }

            axios(addEventConfig).then((res)=>{
                setIsModalOpen(false);
                console.log("Response : ",res);
            }).catch((err)=>{
                console.log("error : ", err);
            })
        }
    }, [zoomResponse])

    const onFinish = (values) => {
        console.log('Success:', values);

        setFormData(values);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log("FreeSlot : ", freeSlot);
    console.log("Zoom reposnse  : ", zoomResponse);

    return (
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
    );
};
export default MeetingForm;