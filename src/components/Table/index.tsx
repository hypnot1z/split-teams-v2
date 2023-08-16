import * as React from 'react';
import { useState, FC } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import TableButton from '../../components/UI/TableButton'
import RankBlock from '../RankBlock'

interface TableProps {
  data: Player[]
}

enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

const Table: FC<TableProps> = ({ data }) => {
  const [editedData, setEditedData] = useState<Player[]>(data);
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null)
  const [sortedField, setSortedField] = useState<keyof Player | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASCENDING)

  const sortData = (field: keyof Player) => {
    const newSortDirection =
      field === sortedField && sortDirection === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING;

    const sorted = [...editedData].sort((a, b) => {
      const comparison = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      return newSortDirection === SortDirection.ASCENDING ? comparison : -comparison;
    });

    setEditedData(sorted);
    setSortDirection(newSortDirection);
    setSortedField(field);
  };

  // const handleNameChange = (id: string, value: string) => {
  //   setEditedData((prevData: Player[]) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, name: value } : item
  //     )
  //   );
  // };

  // const handleLastNameChange = (id: string, value: string) => {
  //   setEditedData((prevData: Player[]) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, lastName: value } : item
  //     )
  //   );
  // };

  // const handleRankChange = (id: string, value: number) => {
  //   setEditedData((prevData: Player[]) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, rank: value } : item
  //     )
  //   );
  // }

  const handleFieldChange = (id: string, value: string | number, name: string) => {
    console.log('id : ', id, 'value : ', value, 'name : ', name)
  }

  const handleDeletePlayer = (id: string) => {
    setEditedData((prevData: Player[]) => prevData.filter((player) => player.id !== id));
    //todo Удаление из базы
  };

  const handleToggleEdit = (id: string) => {
    if (id === editPlayerId) {
      setEditPlayerId(null);
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
          <th className={cn.nameCol} onClick={() => sortData('name')}>Имя</th>
          <th className={cn.nameCol} onClick={() => sortData('lastName')}>Фамилия</th>
          <th className={cn.rankCol} onClick={() => sortData('rank')}>Рейтинг</th>
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
              <RankBlock playerId={player.id} setEditedData={setEditedData} isShow={player.id === editPlayerId}>
              {player.id === editPlayerId 
              ? <input className={cn.inputRank} type='text' placeholder={player.rank.toString()} onChange={(e) => handleFieldChange(player.id, e.target.value, 'rank')}></input> 
              : player.rank}
              </RankBlock>
            </td>

            <td >
              <div className={player.id === editPlayerId ? '' : cn.none}>
              <TableButton  variant='delete' onClick={() => handleDeletePlayer(player.id)}/>
              </div>
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