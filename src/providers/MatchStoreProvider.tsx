import { matchReducer } from '@/reducers/matchReducer';
import { MatchData, MatchReducerType } from '@/types/matches';
import { createContext, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}

const defaultMatchData: MatchData = {
  match: {
    id: 0,
    firstTeamGoals: 0,
    firstTeamId: 0,
    secondTeamId: 0,
    secondTeamGoals: 0,
    result: 0
  },
  playersOnMatch: {
    team1: [],
    team2: []
  }
};

interface MatchDataContextType {
  state: MatchData;
  dispatch: React.Dispatch<MatchReducerType>;
}

const MatchDataContext = createContext<MatchDataContextType>({
  state: defaultMatchData,
  dispatch: () => null
});

const MatchDataProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(matchReducer, defaultMatchData);

  return <MatchDataContext.Provider value={{ state, dispatch }}>{children}</MatchDataContext.Provider>;
};

export { MatchDataContext, MatchDataProvider };
