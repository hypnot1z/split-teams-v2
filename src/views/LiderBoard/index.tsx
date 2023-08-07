import * as React from 'react';
import { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import data from '../../api/db';

const LiderBoard: FC = () => {
  console.log(data)
  const players = (players: Player[]) => {
    players.sort((a, b) => b.wins - a.wins)
    return players.map((player, index) => (
      <li
        key={player.id}
        className={cn.item}
      >
        {index + 1}
        <div>
          {player.name} {player.lastName}
        </div>
        {player.wins}
      </li>
    ));
  };
  return (
  <>
  <nav>
      <Link to='/table'>
        <Button>Таблица</Button>
      </Link>
      <Link to='/auth'><Button>Войти</Button></Link>
    </nav>
  <ul className={cn.liderBoard}>{players(data)}</ul>
  </>
  );
};

export default LiderBoard