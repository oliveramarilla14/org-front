import { MatchData, MatchReducerType } from '@/types/matches';
import { produce } from 'immer';

export function matchReducer(state: MatchData, action: MatchReducerType) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'addPlayer':
        draft.playersOnMatch[`team${action.payload.team}`].push(action.payload.stats);
        break;
      case 'setTeam':
        draft.playersOnMatch[`team${action.payload.team}`] = action.payload.teamStats.map((stat) => ({
          id: stat.id.toString(),
          ci: stat.Player.documentNumber,
          name: stat.Player.name,
          goals: stat.goals,
          reds: stat.red,
          yellows: stat.yellow
        }));
        break;
      case 'removePlayer':
        draft.playersOnMatch[`team${action.payload.team}`] = draft.playersOnMatch[`team${action.payload.team}`].filter(
          (stat) => stat.id !== action.payload.playerId
        );
        break;

      case 'addStats':
        draft.playersOnMatch[`team${action.payload.team}`] = draft.playersOnMatch[`team${action.payload.team}`].map(
          (player) =>
            player.id === action.payload.playerId
              ? { ...player, [action.payload.stat]: player[action.payload.stat] + 1 }
              : player
        );

        if (action.payload.stat === 'goals') {
          action.payload.team === '1'
            ? (draft.match.firstTeamGoals = draft.match.firstTeamGoals + 1)
            : (draft.match.secondTeamGoals = draft.match.secondTeamGoals + 1);
        }
        break;

      case 'restStats':
        draft.playersOnMatch[`team${action.payload.team}`] = draft.playersOnMatch[`team${action.payload.team}`].map(
          (player) =>
            player.id === action.payload.playerId
              ? { ...player, [action.payload.stat]: player[action.payload.stat] - 1 }
              : player
        );

        if (action.payload.stat === 'goals') {
          action.payload.team === '1'
            ? (draft.match.firstTeamGoals = draft.match.firstTeamGoals - 1)
            : (draft.match.secondTeamGoals = draft.match.secondTeamGoals - 1);
        }
        break;

      case 'setMatch':
        draft.match.id = action.payload.match.id;
        draft.match.result = action.payload.match.result ?? 0;
        draft.match.firstTeamId = action.payload.match.firstTeamId;
        draft.match.secondTeamId = action.payload.match.secondTeamId;
        break;

      default:
        break;
    }
  });
}
