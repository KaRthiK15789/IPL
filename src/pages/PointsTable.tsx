import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { PointsTableEntry } from '../types';

const PointsTable: React.FC = () => {
  const { pointsTable, isLoading, error, refreshData } = useData();
  const [sortColumn, setSortColumn] = useState<keyof PointsTableEntry>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} retryFn={refreshData} />;
  }

  const handleSort = (column: keyof PointsTableEntry) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...pointsTable].sort((a, b) => {
    let comparison = 0;
    
    if (sortColumn === 'team') {
      comparison = a.team.name.localeCompare(b.team.name);
    } else {
      comparison = a[sortColumn] > b[sortColumn] ? 1 : -1;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Points Table</h1>
        <button 
          onClick={refreshData}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('team')}>
                  Team {sortColumn === 'team' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('matches')}>
                  M {sortColumn === 'matches' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('won')}>
                  W {sortColumn === 'won' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('lost')}>
                  L {sortColumn === 'lost' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('noResult')}>
                  NR {sortColumn === 'noResult' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('points')}>
                  PTS {sortColumn === 'points' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('netRunRate')}>
                  NRR {sortColumn === 'netRunRate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((entry, index) => (
                <tr key={entry.teamId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10" src={entry.team.logo} alt={entry.team.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{entry.team.name}</div>
                        <div className="text-sm text-gray-500">{entry.team.shortName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.matches}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.won}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.lost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.noResult}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{entry.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={entry.netRunRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {entry.netRunRate > 0 ? '+' : ''}{entry.netRunRate.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;