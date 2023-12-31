import * as React from 'react';
import { FC } from 'react'
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';

interface ItemProps {
  toggle: (arg: string) => void
  state: Player[]
}

const Item: FC<ItemProps> = ({ toggle, state }) => {
  const players = (players: Player[]) => {
    return players.map((player) => (
      <li
        key={player.id}
        className={`${cn.item} ${player.selected ? cn.active : ''}`}
        onClick={() => toggle(player.id)}
      >
        <div>
          {player.name} {player.lastName}
        </div>
        {player.rank}
      </li>
    ));
  };
  return <>{players(state)}</>;
};

export default Item;
