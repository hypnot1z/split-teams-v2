import * as React from 'react';
import { FC } from 'react';
import cn from './style.module.scss';
import data from '../../api/db';
import NavButton from '../../components/UI/NavButton'
import Table from '../../components/Table'


const EditTable: FC = () => {
  return (
    <>
      <nav>
        <NavButton to='/' text='Назад'/>
        <NavButton to='/newplayer' text='Добавить'/>
      </nav>

      <Table data={data} />
    </>
  );
};

export default EditTable;