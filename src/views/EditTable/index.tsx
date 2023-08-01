import * as React from 'react';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import data from '../../api/db';
import Button from '../../UI/Button'
import { FiTrash2 } from 'react-icons/fi'

const EditTable = () => {
  const [editedData, setEditedData] = useState<Player[]>(data);

  const handleNameChange = (id: string, value: string) => {
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleLastNameChange = (id: string, value: string) => {
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, lastName: value } : item
      )
    );
  };

  const handleLastRankChange = (id: string, value: number) => {
    setEditedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, rank: value } : item
      )
    );
    //todo Изменение в базе
  };

  const handleDeletePlayer = (id: string) => {
    setEditedData((prevData) => prevData.filter((player) => player.id !== id));
    //todo Удаление из базы
  };

  const isNameValid = (value: string) => /^[А-Яа-я]{1,30}$/.test(value);

// const isRankValid = (value: number) => /^[0-9]{3}$/.test(value);


  return (
    <>
    <nav>
<Link to='/'><Button>Назад</Button></Link>
<Link to='/newplayer'><Button>Добавить</Button></Link>
        </nav>
    <table className={cn.playersTable}>
      <tbody>
        {editedData.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                className={cn.inputTable}
                type="text"
                value={item.name}
                onChange={(e) => isNameValid(e.target.value) && handleNameChange(item.id, e.target.value)}
              />
            </td>
            <td>
              <input
                className={cn.inputTable}
                type="text"
                value={item.lastName}
                onChange={(e) => isNameValid(e.target.value) && handleLastNameChange(item.id, e.target.value)}
              />
            </td>
            <td><input
                className={`${cn.inputTable} ${cn.rank}`}
                type="text"
                value={item.rank}
                onChange={(e) => handleLastRankChange(item.id, Number(e.target.value))}
              /></td>
              <td>
              <Button border='bnone' color='red' onClick={() => handleDeletePlayer(item.id)}><FiTrash2/></Button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default EditTable;