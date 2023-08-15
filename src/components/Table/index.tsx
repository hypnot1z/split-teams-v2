import * as React from 'react';
import { useState, FC } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import TableButton from '../../components/UI/TableButton'
import RankBlock from '../RankBlock'

interface TableProps {
  data: Player[]
}

const Table: FC<TableProps> = ({ data }) => {
  const [editedData, setEditedData] = useState<Player[]>(data);
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null)
  const [sortedData, setSortedData] = useState<Player[]>(data);

  const sortData = (field: keyof Player) => {
    const sorted = [...editedData].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setEditedData(sorted);
  };

  const handleNameChange = (id: string, value: string) => {
    setEditedData((prevData: Player[]) =>
      prevData.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleLastNameChange = (id: string, value: string) => {
    setEditedData((prevData: Player[]) =>
      prevData.map((item) =>
        item.id === id ? { ...item, lastName: value } : item
      )
    );
  };



  const handleDeletePlayer = (id: string) => {
    setEditedData((prevData: Player[]) => prevData.filter((player) => player.id !== id));
    //todo Удаление из базы
  };

  const handleToggleEdit = (id: string) => {
    if (id === editPlayerId) {
      setEditPlayerId(null)
    } else {
      setEditPlayerId(id)
    }
  }

  const isNameValid = (value: string) => /^[А-Яа-я]{1,30}$/.test(value);

// const isRankValid = (value: number) => /^[0-9]{3}$/.test(value);


  return (
    <table className={cn.playersTable}>
      <thead>
        <tr>
          <th onClick={() => sortData('name')}>Имя</th>
          <th onClick={() => sortData('lastName')}>Фамилия</th>
          <th onClick={() => sortData('rank')}>Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        {editedData.map((player: Player) => (
          <tr key={player.id}>
            <td className={cn.name}>
              {player.id === editPlayerId ? <input className={cn.inputName} type='text' placeholder={player.name}></input> : player.name}
            </td>

            <td>
              {player.id === editPlayerId ? <input className={cn.inputName} type='text' placeholder={player.lastName}></input> : player.lastName}
            </td>

            <td>
              <RankBlock playerId={player.id} setEditedData={setEditedData} isShow={editPlayerId}>
              {player.id === editPlayerId 
              ? <input className={cn.inputRank} type='text' placeholder={player.rank.toString()}></input> 
              : player.rank}
              </RankBlock>
            </td>

            <td>
              <TableButton variant='delete' onClick={() => handleDeletePlayer(player.id)}/>
            </td>

            <td>
              {player.id !== editPlayerId 
              ? <TableButton variant='edit' onClick={() => handleToggleEdit(player.id)}/>
              : <TableButton variant='check' onClick={() => handleToggleEdit(player.id)}/>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;