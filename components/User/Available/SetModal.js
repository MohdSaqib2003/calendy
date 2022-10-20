import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import MeetingForm from './meetingForm';

const SetModal = ({freeSlot}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <Button type="primary" onClick={showModal}>
         Schedule
        </Button>
        <Modal title="Schedule Meeting" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <MeetingForm freeSlot={freeSlot} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Modal>
      </>
    );
}

export default SetModal;