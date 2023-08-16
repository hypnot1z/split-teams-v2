import * as React from 'react';
import { useState, FC, PropsWithChildren } from 'react';
import cn from './style.module.scss';
import type Player from '../../interfaces/Player';
import TableButton from '../../components/UI/TableButton'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface RankBlockProps {
  playerId: string
  isShow: boolean
  setEditedData: (any) => void
}

const RankBlock: FC<PropsWithChildren<RankBlockProps>> = ({ children, playerId, isShow = 'true', setEditedData}) => {

  const handleRankChange = (id: string, value: number) => {
    setEditedData((prevData: Player[]) =>
    prevData.map((item) => 
        item.id === id ? { ...item, rank: item.rank + value } : item
    )
    );
    //todo Изменение в базе
  };

  const down: ReactJSXElement = <><TableButton variant='doubledown' onClick={() => handleRankChange(playerId, -2)}/>
  <TableButton variant='down' onClick={() => handleRankChange(playerId, -1)}/></>

  const up: ReactJSXElement = <><TableButton variant='up' onClick={() => handleRankChange(playerId, 1)}/>
  <TableButton variant='doubleup' onClick={() => handleRankChange(playerId, 2)}/></>

  return (
    <div className={cn.rankContainer}>
      {/* <TableButton variant='doubledown' onClick={() => handleRankChange(playerId, -2)}/>
      <TableButton variant='down' onClick={() => handleRankChange(playerId, -1)}/> */}
      {/* {isShow ? `${down} ${children} ${up}` : {children}} */}
      {isShow ? down : null}

      {children}

      {isShow ? up : null}
      {/* <TableButton variant='up' onClick={() => handleRankChange(playerId, 1)}/>
      <TableButton variant='doubleup' onClick={() => handleRankChange(playerId, 2)}/> */}
    </div>
  )
}

export default RankBlock