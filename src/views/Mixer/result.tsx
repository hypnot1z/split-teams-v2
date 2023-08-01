import * as React from 'react';
import { useEffect, useState } from 'react'
import cn from './style.module.scss';
import distributePlayers from '../../core'

const Color = ['Red', 'Green', 'Black', 'Grey', 'Orange', 'Blue']
enum ColorCode {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Grey = '#a6a6a6',
  Black = '#000000',
  Orange = '#FFA500',
}

const Result = ({selectedPlayers, refresh}) => {
  const [result, setResult] = useState({teams: [], teamsRank: [], teamsAverageRank: [], roundedAverageRanks: [] })
  useEffect(() => {

    const teams = distributePlayers(selectedPlayers)
    const teamsRank = teams.map(team => team.reduce((sum, player) => sum + player.rank, 0))
    const teamsAverageRank = teams.map(team => (team.reduce((sum, player) => sum + player.rank, 0) / team.length))
    const roundedAverageRanks = teamsAverageRank.map(rank => Math.round(rank)) 
    setResult({teams, teamsRank, teamsAverageRank, roundedAverageRanks})
  }, [refresh])
  return (
    <div id='result'>
    {result.teams.map((team, index) => (
      <li style={{color: ColorCode[Color[index]]}} key={index}><div> Команда {Color[index]}</div> <div>Рейтинг общий : {result.teamsRank[index]} средний : {result.roundedAverageRanks[index]}</div>
      <ul>
        {team.map(player => (
          <li className={cn.item} key={player.id}>
            <div>
          {player.name} {player.lastName}
        </div>
        {player.rank}
            </li>
        ))}
        </ul>
        </li>
    ))}
    </div>
  )
  
};

export default Result;
