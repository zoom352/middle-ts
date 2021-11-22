import { Layout, Modal, Row } from "antd"
import React, {FC, useEffect, useState} from "react"
import EventCalendar from "../components/EventCalendar"
import EventForm from "../components/EventForm"

// import EventForm from "../components/EventForm"
import { UseActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IEvent } from "../models/IEvent"

const Event: FC = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = UseActions();
    const {guests, events} = useTypedSelector(state => state.event);
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }


    return (
        <Layout>
            {/* <div>{JSON.stringify(events)}</div> */}
            <EventCalendar events={events}/>
            <Row justify='center'>
                <button onClick={() => setModalVisible(true)}>Add event</button>
            </Row>
            <Modal 
               title='add event'
               visible={modalVisible}
               footer={null}
               onCancel={() => setModalVisible(false)}>
                   <EventForm 
                      guests={guests}
                      submit={addNewEvent}/>
               </Modal>
        </Layout>
    )
}


export default Event