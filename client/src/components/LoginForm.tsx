import { observer } from 'mobx-react-lite'
import { FC, useContext, useState } from 'react'
import { Context } from '..'

const LoginForm:FC = observer( () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  return (
    <div>
      <input 
        type='text' 
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input 
        type='password' 
        placeholder='Пароль'
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
    </div>
  )
})

export default LoginForm