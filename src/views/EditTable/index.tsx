import * as React from 'react';
import {Link} from 'react-router-dom'
import { useState, useRef } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import data from '../../api/db';
import Button from '../../components/UI/Button'
import { FiTrash2, FiEdit, FiChevronDown, FiChevronUp, FiChevronsDown, FiChevronsUp, FiCheckCircle } from 'react-icons/fi'

const EditTable = () => {
  const [editedData, setEditedData] = useState<Player[]>(data);
  const [editPlayerId, setEditPlayerId] = useState<string | null>(null)

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

  const handleRankChange = (id: string, value: number) => {
    setEditedData((prevData: Player[]) =>
    prevData.map((item) => 
        item.id === id ? { ...item, rank: item.rank + value } : item
    )
    );
    //todo Изменение в базе
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
    <>
    <nav>
<Link to='/'><Button>Назад</Button></Link>
<Link to='/newplayer'><Button>Добавить</Button></Link>
        </nav>
    <table className={cn.playersTable}>
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
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleRankChange(player.id, -2)}><FiChevronsDown/></button>
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleRankChange(player.id, -1)}><FiChevronDown/></button>

              {player.id === editPlayerId ? <input className={cn.inputRank} type='number' placeholder={player.rank.toString()}></input> : 
              player.rank
            }

              <button className={`${cn.btnTable} ${cn.btnGreen}`} onClick={() => handleRankChange(player.id, 1)}><FiChevronUp/></button>
              <button className={`${cn.btnTable} ${cn.btnGreen}`} onClick={() => handleRankChange(player.id, 2)}><FiChevronsUp/></button>
              </td>
              <td>
              <button className={`${cn.btnTable} ${cn.btnRed}`} onClick={() => handleDeletePlayer(player.id)}><FiTrash2/></button>
              </td>
              <td>
              <button className={`${cn.btnTable} ${cn.btnBlue}`} onClick={() => handleToggleEdit(player.id)}>{player.id !== editPlayerId ? <FiEdit/> : <FiCheckCircle/>}</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default EditTable;