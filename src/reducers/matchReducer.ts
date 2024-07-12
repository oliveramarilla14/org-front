import { MatchData, MatchReducerType } from '@/types/matches';
import { produce } from 'immer';

export function matchReducer(state: MatchData, action: MatchReducerType) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'addPlayer':
        draft.playersOnMatch[`team${action.payload.team}`].push(action.payload.stats);
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

        break;

      case 'restStats':
        draft.playersOnMatch[`team${action.payload.team}`] = draft.playersOnMatch[`team${action.payload.team}`].map(
          (player) =>
            player.id === action.payload.playerId
              ? { ...player, [action.payload.stat]: player[action.payload.stat] - 1 }
              : player
        );
        break;

      default:
        break;
    }
  });
}
