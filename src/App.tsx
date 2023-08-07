import * as React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import cn from './style.module.scss';
import Auth from './views/Auth'
import Mixer from './views/Mixer';
import EditTable from './views/EditTable'
import NewPlayer from './views/NewPlayer'
import LiderBoard from './views/LiderBoard'


export default function App() {
  return (
    <BrowserRouter>
    <div className={cn.app}>
      <Routes>
        <Route path='/' element={<Mixer/>}/>
        <Route path='/table' element={<EditTable/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/newplayer' element={<NewPlayer/>}/>
        <Route path='/liderboard' element={<LiderBoard />}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}
