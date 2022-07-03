import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser.interface';
import UserService from './services/UserService';

const App: FC =observer( () => {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if(store.isLoading) {
    return <div>Загрузка...</div>
  }

  if(!store.isAuth) {
    return (
      <div>
      <LoginForm />
      <button onClick={getUsers}>Получить список пользователей</button>
    </div>
    )
  }

  return (
    <div className="App">
      <h1>{store.isAuth ?  'Пользователь авторизован' : 'Авторизируйтесь'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт!'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  );
})

export default App;
