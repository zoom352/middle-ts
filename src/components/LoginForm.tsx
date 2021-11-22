import {Button, Form, Input} from "antd"
import React, {FC, useState} from "react";
import { useDispatch } from "react-redux";
import { UseActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { rules } from "../utils/rules";

const LoginForm: FC = () => {

    // const dispatch = useDispatch()
    const {error, isLoading} = useTypedSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = UseActions()


    const submit = () => {
        login(username, password)
        // dispatch(AuthActionCreators.login(username, password))
    }

    return (
        <Form onFinish={submit}>
            {error && <div style={{color: 'red'}}>
               {error}    
            </div>}
            <Form.Item
               label="Name of user"
               name="username"
               rules={[ rules.required('Please input your username!') ]}>
               <Input
                value={username} 
                onChange={e => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
               label="password"
               name="password"
               rules={[ rules.required('Please input your username!')]}>
               <Input 
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 type='password'/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                   Submit
                </Button>
            </Form.Item>
            
        </Form>
    )
}

export default LoginForm;