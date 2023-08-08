import * as React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom'
import cn from './style.module.scss';
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'

interface Player {
  name: string
  lastName: string
  rank: number
}

const NewPlayer = () => {
  const [players, setPlayers] = useState<Player[]>([{name: '', lastName: '', rank: 40}])

  const handleAddPlayer = () => {
    setPlayers([...players, {name: '', lastName: '', rank: 40}])
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const validPlayers = players.filter((player) => player.name && player.lastName);

    if (validPlayers.length > 0) {
      console.log(validPlayers); // Отправьте данные на сервер или выполните другую необходимую обработку
    } else {
      console.log('Не все игроки имеют заполненные поля Имя и Фамилия');
    }
  }

  const handleInputChange = (index: number, field: keyof Player, value: string | number) => {
    const updatedPlayers = [...players]
    updatedPlayers[index][field] = value as string | number
    setPlayers(updatedPlayers)
  }

  return(
    <form className={cn.addPlayerForm} onSubmit={handleSubmit}>
      {players.map((player, index) => (

        <div key={index}>
        <Input
        // className={cn.addInput}
        variant='gradient'
        type="text"
        value={player.name}
        placeholder='Имя'
        autoComplete="off"
        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
        />
     
        <Input
        // className={cn.addInput}
        variant='gradient'
        type="text"
        value={player.lastName}
        placeholder='Фамилия'
        autoComplete='off'
        onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
        />
   
        <Input
        variant='gradient'
        // className={cn.Input}
        type="number"
        value={player.rank}
        placeholder='Рейтинг'
        autoComplete='off'
        onChange={(e) => handleInputChange(index, 'rank', e.target.value)}
        />

      </div>
      ))}
      <Button onClick={handleAddPlayer}>+</Button>
      {/* <Link to='/table'> */}
      <Button type="submit" variant='contain'>Добавить</Button>      
      {/* </Link> */}
    </form>
  )
}

export default NewPlayer