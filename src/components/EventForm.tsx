import { FC, useState } from "react";
import { rules } from "../utils/rules";
import { Input, Form, DatePicker, Button, Row } from "antd"
import { Select } from 'antd';
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";


interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
    
    const {user} = useTypedSelector(state => state.auth)
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)


    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())});
        }
    }


    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="описание события"
                name="description"
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}
            >
                <Input 
                   onChange={e => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <DatePicker 
                onChange={(date) => selectDate(date)}/>
            <Form.Item
                label="choise gest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest => 
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>)}
                </Select>
            </Form.Item>
            <Row justify='center'>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        center
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}


export default EventForm;