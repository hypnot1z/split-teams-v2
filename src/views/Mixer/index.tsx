import * as React from 'react';
import html2canvas from 'html2canvas'
import { Link } from 'react-router-dom'
import { useState, FC } from 'react';
import cn from './style.module.scss';
import data from '../../api/db';
import Item from './item';
import Result from './result';
import Button from '../../components/UI/Button'
import { IconContext } from 'react-icons'
import { FiCamera, FiRefreshCcw } from 'react-icons/fi'

const Mixer: FC = () => {
  const initData = data.map((el) => ({ ...el, selected: false }));
  const [state, setState] = useState(initData);
  const [showResult, setShowResult] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [qntTeams, setQntTeams] = useState(null)

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
  const isGoDisabled = count.length < 10

  const handleClickGo = () => {
    setShowResult(true)
    setRefresh(!refresh)
  }

  const handleClickReset = () => {
    setShowResult(false)
    setState(initData)
  }

  const handleIncrement = () => {
    if (qntTeams === 8) {
      setQntTeams(null)
    } else if (qntTeams === null) {
      setQntTeams(2)
    } else {
    setQntTeams(qntTeams + 1);
    }
  };

  const handleDecrement = () => {
    if (qntTeams === 2) {
      setQntTeams(null)
    } else if (qntTeams === null) {
      setQntTeams(8)
    } else {
    setQntTeams(qntTeams - 1);
    }
  };

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
      <ul className={cn.playersList}>
        {!showResult ? <Item toggle={toggleState} state={state} /> : <Result qntTeams={qntTeams} refresh={refresh} selectedPlayers={count}/>}
      </ul>
      <div className={cn.footer}>
        <div className={cn.footerContainer}>
          <Button color='white' variant='rounded' gradient='gred' onClick={handleClickReset}>
          X
        </Button>
        <Button hidden={!showResult} color='white' variant='rounded' gradient='gblue' onClick={handleScreenshotButtonClick} >
          <FiCamera/>
        </Button>
        <div className={cn.qntTeamsContainer}>
          <Button variant='rounded' onClick={handleDecrement}>-</Button>
          <div className={cn.qntTeams}>{qntTeams ? qntTeams : 'авто'}</div>
          <Button variant='rounded' onClick={handleIncrement}>+</Button>
        </div>
        <Button color='white' variant={!isGoDisabled ? 'rounded' : 'disabled'} gradient='gblue' onClick={handleClickGo} disabled={isGoDisabled}>{!showResult ? count.length : <FiRefreshCcw />}</Button>
        </div>
      </div>
      </IconContext.Provider>
    </>
  );
};

export default Mixer;
