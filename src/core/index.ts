import createArrayFromZeroToN from '../utils/createArrayFromZeroToN'
import shuffleArray from '../utils/shuffleArray'
import type Player from '../interfaces/Player'

function distributePlayers(players: Player[], numTeams?: number): Player[][] {

  const sortedPlayers = players.slice().sort((a, b) => b.rank - a.rank);

  const numPlayers: number = sortedPlayers.length;

  if (!numTeams) {
    numTeams = Math.floor(numPlayers / 5) > 6 ? 6 : Math.floor(numPlayers / 5)
  }
  
  const teamsIndex: number[] = createArrayFromZeroToN(numTeams)

  const teams: Player[][] = Array.from({ length: numTeams }, () => []);
  
  for (let i = 0; i < numPlayers; i = i + numTeams) {

    shuffleArray(teamsIndex)

    if (i + numTeams > numPlayers) {
      for (let j = i; j < numPlayers; j++){
        const player = sortedPlayers[j];
        teams[teamsIndex[numPlayers - j]].push(player)
      }
      return teams
    }
    
    for (let n = 0; n < numTeams; n++) {
      const player = sortedPlayers[i + n];
      teams[teamsIndex[n]].push(player)
    }
  }

  return teams;
}

export default distributePlayers