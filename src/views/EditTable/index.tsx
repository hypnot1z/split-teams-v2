import * as React from 'react';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import data from '../../api/db';
import Button from '../../components/UI/Button'
import { FiTrash2, FiEdit, FiChevronDown, FiChevronUp, FiChevronsDown, FiChevronsUp } from 'react-icons/fi'

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

  const handleRankChange = (id: string, value: number) => {
    setEditedData((prevData) =>
    prevData.map((item) => 
        item.id === id ? { ...item, rank: item.rank + value } : item
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
              {item.name}
            </td>
            <td>
              {item.lastName}
            </td>
            <td>
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleRankChange(item.id, -2)}><FiChevronsDown/></button>
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleRankChange(item.id, -1)}><FiChevronDown/></button>
              {item.rank}
              <button className={`${cn.btnTable} ${cn.btnGreen}`} onClick={() => handleRankChange(item.id, 1)}><FiChevronUp/></button>
              <button className={`${cn.btnTable} ${cn.btnGreen}`} onClick={() => handleRankChange(item.id, 2)}><FiChevronsUp/></button>
              </td>
              <td>
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleDeletePlayer(item.id)}><FiTrash2/></button>
              </td>
              <td>
              <button className={`${cn.btnTable} ${cn.btnBlue}`}><FiEdit/></button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default EditTable;