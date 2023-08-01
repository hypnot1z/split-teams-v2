import * as React from 'react';
import html2canvas from 'html2canvas'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import cn from './style.module.scss';
import data from '../../api/db';
import Item from './item';
import Result from './result';
import Button from '../../UI/Button'
import {IconContext} from 'react-icons'
import { FiCamera, FiRefreshCcw } from 'react-icons/fi'

const Mixer = () => {
  const initData = data.map((el) => ({ ...el, selected: false }));
  const [state, setState] = useState(initData);
  const [showResult, setShowResult] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const toggleState = (id: string) => {
    setState(
      state.map((player) => {
        return player.id === id
          ? { ...player, selected: !player.selected }
          : { ...player };
      })
    );
  };

  const count = state.filter((el) => el.selected);
  const isGoDisabled = count.length < 10 || count.length > 36

  const handleClickGo = () => {
    setShowResult(true)
    setRefresh(!refresh)
  }

  const handleClickReset = () => {
    setShowResult(false)
    setState(initData)
  }

  const handleScreenshotButtonClick = () => {
    const elementToScreenshot = document.getElementById('result'); 
    html2canvas(elementToScreenshot).then(canvas => {
 
      const screenshotUrl = canvas.toDataURL('image/png');

      const newWindow = window.open();
      newWindow.document.write('<img src="' + screenshotUrl + '" />');
    });
  };
  

  return (
    <>
    <nav>
<Link to='/table'>
  <Button>Таблица</Button>
</Link>
<Link to='/auth'><Button>Войти</Button></Link>
        </nav>
        <IconContext.Provider value={{ size: '1.23em'}}>
      <ul>
        {!showResult ? <Item toggle={toggleState} state={state} /> : <Result refresh={refresh} selectedPlayers={count}/>}
      </ul>
      <div className={cn.btnContainerRight}>
        <Button color='white' variant={!isGoDisabled ? 'rounded' : 'disabled'} gradient='gblue' onClick={handleClickGo} disabled={isGoDisabled}>{!showResult ? count.length : <FiRefreshCcw />}</Button>
      </div>
      <div className={cn.btnContainerRightTop} hidden={!showResult}>
        <Button color='white' variant='rounded' gradient='gblue' onClick={handleScreenshotButtonClick} >
          <FiCamera/>
        </Button>
      </div>
      <div className={cn.btnContainerLeft}>
        <Button color='white' variant='rounded' gradient='gred' onClick={handleClickReset}>
          X
        </Button>
      </div>
      </IconContext.Provider>
    </>
  );
};

export default Mixer;
