/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2z8zgDWDxnD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState, useMemo } from 'react';

export default function PositionsTable() {
  const [sortColumn, setSortColumn] = useState('points');
  const [sortDirection, setSortDirection] = useState('desc');
  const leagueTable = [
    {
      team: 'Manchester United',
      played: 38,
      points: 86,
      goalsFor: 73,
      goalsAgainst: 27,
      goalDifference: 46
    },
    {
      team: 'Manchester City',
      played: 38,
      points: 84,
      goalsFor: 85,
      goalsAgainst: 20,
      goalDifference: 65
    },
    {
      team: 'Arsenal',
      played: 38,
      points: 78,
      goalsFor: 68,
      goalsAgainst: 30,
      goalDifference: 38
    },
    {
      team: 'Liverpool',
      played: 38,
      points: 75,
      goalsFor: 77,
      goalsAgainst: 25,
      goalDifference: 52
    },
    {
      team: 'Chelsea',
      played: 38,
      points: 72,
      goalsFor: 60,
      goalsAgainst: 33,
      goalDifference: 27
    },
    {
      team: 'Tottenham Hotspur',
      played: 38,
      points: 69,
      goalsFor: 63,
      goalsAgainst: 37,
      goalDifference: 26
    },
    {
      team: 'Brighton & Hove Albion',
      played: 38,
      points: 62,
      goalsFor: 52,
      goalsAgainst: 40,
      goalDifference: 12
    },
    {
      team: 'Brentford',
      played: 38,
      points: 54,
      goalsFor: 48,
      goalsAgainst: 42,
      goalDifference: 6
    },
    {
      team: 'Aston Villa',
      played: 38,
      points: 49,
      goalsFor: 44,
      goalsAgainst: 49,
      goalDifference: -5
    },
    {
      team: 'Fulham',
      played: 38,
      points: 46,
      goalsFor: 51,
      goalsAgainst: 53,
      goalDifference: -2
    },
    {
      team: 'Crystal Palace',
      played: 38,
      points: 45,
      goalsFor: 42,
      goalsAgainst: 46,
      goalDifference: -4
    },
    {
      team: 'Leicester City',
      played: 38,
      points: 44,
      goalsFor: 47,
      goalsAgainst: 52,
      goalDifference: -5
    },
    {
      team: 'Leeds United',
      played: 38,
      points: 42,
      goalsFor: 48,
      goalsAgainst: 57,
      goalDifference: -9
    },
    {
      team: 'Bournemouth',
      played: 38,
      points: 39,
      goalsFor: 38,
      goalsAgainst: 61,
      goalDifference: -23
    },
    {
      team: 'Everton',
      played: 38,
      points: 36,
      goalsFor: 34,
      goalsAgainst: 58,
      goalDifference: -24
    },
    {
      team: 'West Ham United',
      played: 38,
      points: 35,
      goalsFor: 43,
      goalsAgainst: 52,
      goalDifference: -9
    },
    {
      team: 'Nottingham Forest',
      played: 38,
      points: 31,
      goalsFor: 34,
      goalsAgainst: 66,
      goalDifference: -32
    },
    {
      team: 'Southampton',
      played: 38,
      points: 31,
      goalsFor: 38,
      goalsAgainst: 67,
      goalDifference: -29
    },
    {
      team: 'Wolverhampton Wanderers',
      played: 38,
      points: 30,
      goalsFor: 31,
      goalsAgainst: 48,
      goalDifference: -17
    },
    {
      team: 'Newcastle United',
      played: 38,
      points: 29,
      goalsFor: 40,
      goalsAgainst: 49,
      goalDifference: -9
    }
  ];
  const sortedLeagueTable = useMemo(() => {
    return [...leagueTable].sort((a, b) => {
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      return 0;
    });
  }, [leagueTable, sortColumn, sortDirection]);
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };
  return (
    <div className='w-full max-w-4xl mx-auto p-4 md:p-6'>
      <h2 className='text-2xl font-bold mb-4'>Positions</h2>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-800'>
              <th className='px-4 py-3 text-left cursor-pointer' onClick={() => handleSort('team')}>
                Team{' '}
                {sortColumn === 'team' && <span className='ml-2'>{sortDirection === 'asc' ? '\u25B2' : '\u25BC'}</span>}
              </th>
              <th className='px-4 py-3 text-right cursor-pointer' onClick={() => handleSort('played')}>
                Played{' '}
                {sortColumn === 'played' && (
                  <span className='ml-2'>{sortDirection === 'asc' ? '\u25B2' : '\u25BC'}</span>
                )}
              </th>
              <th className='px-4 py-3 text-right cursor-pointer' onClick={() => handleSort('points')}>
                Points{' '}
                {sortColumn === 'points' && (
                  <span className='ml-2'>{sortDirection === 'asc' ? '\u25B2' : '\u25BC'}</span>
                )}
              </th>
              <th className='px-4 py-3 text-right cursor-pointer' onClick={() => handleSort('goalsFor')}>
                GF{' '}
                {sortColumn === 'goalsFor' && (
                  <span className='ml-2'>{sortDirection === 'asc' ? '\u25B2' : '\u25BC'}</span>
                )}
              </th>
              <th className='px-4 py-3 text-right cursor-pointer' onClick={() => handleSort('goalDifference')}>
                GD{' '}
                {sortColumn === 'goalDifference' && (
                  <span className='ml-2'>{sortDirection === 'asc' ? '\u25B2' : '\u25BC'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLeagueTable.map((team, index) => (
              <tr
                key={team.team}
                className={`border-b border-gray-200 dark:border-gray-700 ${
                  index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''
                }`}
              >
                <td className='px-4 py-3 text-left font-medium'>{team.team}</td>
                <td className='px-4 py-3 text-right'>{team.played}</td>
                <td className='px-4 py-3 text-right'>{team.points}</td>
                <td className='px-4 py-3 text-right'>{team.goalsFor}</td>
                <td className='px-4 py-3 text-right'>{team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
