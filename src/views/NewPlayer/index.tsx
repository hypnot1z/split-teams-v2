import * as React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import cn from './style.module.scss';
import Button from '../../components/UI/Button'

const NewPlayer = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rank, setRank] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    // Вместо прямой авторизации здесь обычно выполняется запрос на сервер для проверки данных.
    // После успешной проверки, обрабатывается ответ сервера и выполнение onLogin.
    // В данном примере, просто вызываем функцию onLogin с введенными данными.
    // onLogin(name, password);
    console.log(name, lastName, rank)
    setName('');
    setLastName('');
    setRank('')
  };

  return(
    <form className={cn.addPlayerForm} onSubmit={handleAdd}>
      <div>
        <input
        className={cn.addInput}
          type="text"
          value={name}
          placeholder='Имя'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
        className={cn.addInput}
          type="text"
          value={lastName}
          placeholder='Фамилия'
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <input
        className={cn.addInput}
          type="text"
          value={rank}
          placeholder='Рейтинг'
          onChange={(e) => setRank(e.target.value)}
        />
      </div>
      <Link to='/table'>
      <Button type="submit" variant='contain'>Добавить</Button>      
      </Link>
    </form>
  )
}

export default NewPlayer