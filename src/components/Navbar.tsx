import { Layout, Menu, Row } from 'antd';
import React, {FC} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UseActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../router';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';

const Navbar: FC = () => {

    const dispatch = useDispatch()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const router = useHistory()
    const {logout} = UseActions()

    return (
        <Layout.Header>
            {isAuth ?
            <>
            <div style={{color: 'white'}}>{user.username}</div>
            <Row justify="end">
            <Menu theme="dark" mode="horizontal" selectable={false}>
                
            <Menu.Item onClick={logout} key={1}>Logout</Menu.Item>
        </Menu>
        </Row>
        </>
        : 
        <Menu theme="dark" mode="horizontal" selectable={false}>
                    <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>Login</Menu.Item>
                </Menu>
                }
                
        </Layout.Header>
    )
}

export default Navbar