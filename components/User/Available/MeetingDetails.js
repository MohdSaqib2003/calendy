import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col } from 'antd';
import moment from 'moment';
import Link from 'next/link';

const MeetingDetails = ({ meetingDetails, setMeetingDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (meetingDetails != null) {
            setIsModalOpen(true);
        }

    }, [meetingDetails])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setMeetingDetails(null);
    };

    // if (meetingDetails == null) {
    //     return <></>
    // }
    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}

            <Modal title="Meeting Details" footer={<Button onClick={handleCancel}>close</Button>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Row>
                        <Col flex={2}>Topic : </Col>
                        <Col flex={3}>{meetingDetails?.topic}</Col>
                    </Row>
                    <Row>
                        <Col flex={2}>Start time : </Col>
                        <Col flex={3}>
                        {moment(new Date(meetingDetails?.start_time).toString()).format("DD-M-YYYY,HH:MM:SS")}
                        {/* {moment(meetingDetails?.start_time).format("DD-MM-YYYY,HH:MM:ss:a")} */}
                        </Col>
                    </Row>
                    <Row>
                        <Col flex={2}>Duration : </Col>
                        <Col flex={3}>{meetingDetails?.duration}</Col>
                    </Row>
                    <Row>
                        <Col flex={2}>Meeting url:  </Col>
                        <Col flex={3}>
                        <a href="https://us05web.zoom.us/j/86315202465?pwd=b1kyQTh6aTlxNnhaeTZ4Y1NHeXpOZz09">
                        {meetingDetails?.join_url}
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col flex={2}>Passwprd : </Col>
                        <Col flex={3}>{meetingDetails?.password}</Col>
                    </Row>
                </div>
                {console.log("Meeting Detail : ", meetingDetails)}
            </Modal></>
    )
}

export default MeetingDetails