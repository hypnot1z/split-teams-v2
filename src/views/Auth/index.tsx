import * as React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import cn from './style.module.scss';
import Button from '../../components/UI/Button'

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Вместо прямой авторизации здесь обычно выполняется запрос на сервер для проверки данных.
    // После успешной проверки, обрабатывается ответ сервера и выполнение onLogin.
    // В данном примере, просто вызываем функцию onLogin с введенными данными.
    // onLogin(username, password);
    console.log(username, password)
    setUsername('');
    setPassword('');
  };
  return (
    <>
    <nav>
      <Link to='/'><Button>Назад</Button></Link>
      </nav>
      <form className={cn.authForm} onSubmit={handleLogin}>
      <div>
        <input
        className={cn.authInput}
          type="text"
          value={username}
          placeholder='Логин'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
        className={cn.authInput}
          type="password"
          value={password}
          placeholder='Пароль'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant='contain'>Войти</Button>      
    </form>
    </>
  )
}

export default Auth