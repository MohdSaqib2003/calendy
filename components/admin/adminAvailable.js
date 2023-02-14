import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { List, Button, Skeleton } from 'antd';
import moment from 'moment/moment';

const AdminAvailable = ({ addedStatus }) => {
    const [allSlots, setAllSlots] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/getAvailable`).then((res) => {
            setAllSlots(res?.data?.slots);
            setDeleteLoading(false);
        }).catch((err) => {
            console.log("Err : ", err);
        })
    }, [, deleteLoading, addedStatus])

    const deleteSlot = (dateToDelete) => {
        console.log("DDD : ", typeof dateToDelete);
        console.log("D to dele : ", JSON.stringify(dateToDelete));
        setDeleteLoading(true);
        axios.post(`http://localhost:3000/api/deleteSlot`, JSON.stringify(dateToDelete)).then((res) => {
            console.log("SUCCES", res);
            setDeleteLoading(false);
        }).catch((err) => {
            setDeleteLoading(false);
            console.log("Err : ", err);
        })
        console.log("Delete fun end")
    }
    console.log("RneDERED: ");

    return (
        <div style={{ border: '2px solid black' }}>
            <h3>Your Available slots :</h3>

            {deleteLoading ? <Skeleton active /> :
                <div>
                    {allSlots?.map((freeSlot) => {
                        return <List.Item style={{ border: '1px solid blue', margin: '5px' }}>
                            <b>{moment(freeSlot[0]).format("DD MMM, YYYY ")}</b> {" "} {" "}
                            {moment(freeSlot[0]).format("HH:mm")}  -  {moment(freeSlot[1]).format("HH:mm")}
                            {" "} <Button type='danger' onClick={() => { deleteSlot(freeSlot) }}>Delete</Button>
                            {/* {" "} <Button type='danger' onClick={() => { deleteSlot(freeSlot[0]) }}>Delete</Button> */}
                        </List.Item>
                    })}
                </div>
            }
        </div>
    )
}

export default AdminAvailable;