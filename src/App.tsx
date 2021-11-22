import { Layout } from 'antd';
import React, {FC, useEffect} from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import './App.css'
import { UseActions } from './hooks/useActions';
import { IUser } from './models/IUser';

const App: FC = () => {

 const {setUser, setIsAuth} = UseActions()

 useEffect(() => {
   if(localStorage.getItem('isAuth')) {
    setUser({username: localStorage.getItem('username' || '')} as IUser)
    setIsAuth(true)
   }
 }, [])

  return (
      <Layout>
        <Navbar/>
        <Layout.Content>
          <AppRouter/>
          </Layout.Content>
      </Layout>
  );
}

export default App;
