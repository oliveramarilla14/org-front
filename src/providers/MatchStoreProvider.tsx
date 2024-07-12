import { MatchData, PlayerS } from '@/types/matches';
import { createContext, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}

type ActionType =
  | {
      type: 'addPlayer';
      payload: {
        stats: PlayerS;
        team: '1' | '2';
      };
    }
  | {
      type: 'removePlayer';
    };

const defaultMatchData: MatchData = {
  match: {
    id: 0,
    firstTeamGoals: 0,
    secondTeamGoals: 0,
    result: 0
  },
  playersOnMatch: {
    team1: [],
    team2: []
  }
};

function reducer(state: MatchData, action: ActionType) {
  switch (action.type) {
    case 'addPlayer':
      return {
        ...state,
        playersOnMatch: {
          ...state.playersOnMatch,
          [`team${action.payload.team}`]: [...state.playersOnMatch[`team${action.payload.team}`], action.payload.stats]
        }
      };

    default:
      return state;
  }
}

interface MatchDataContextType {
  state: MatchData;
  dispatch: React.Dispatch<ActionType>;
}

const MatchDataContext = createContext<MatchDataContextType>({
  state: defaultMatchData,
  dispatch: () => null
});

const MatchDataProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, defaultMatchData);

  return <MatchDataContext.Provider value={{ state, dispatch }}>{children}</MatchDataContext.Provider>;
};

export { MatchDataContext, MatchDataProvider };
