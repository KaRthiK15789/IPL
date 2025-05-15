import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import MatchCard from '../components/MatchCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Team, Match } from '../types';

const Schedule: React.FC = () => {
  const { allMatches, teams, isLoading, error, refreshData } = useData();
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [teamFilter, setTeamFilter] = useState<number | null>(null);
  const [venueFilter, setVenueFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (allMatches) {
      let filtered = [...allMatches];
      
      if (teamFilter) {
        filtered = filtered.filter(match => 
          match.team1.id === teamFilter || match.team2.id === teamFilter
        );
      }
      
      if (venueFilter) {
        filtered = filtered.filter(match => 
          match.venue.toLowerCase().includes(venueFilter.toLowerCase())
        );
      }
      
      if (statusFilter !== 'all') {
        filtered = filtered.filter(match => match.status === statusFilter);
      }
      
      // Sort by date, most recent first
      filtered = filtered.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      
      setFilteredMatches(filtered);
    }
  }, [allMatches, teamFilter, venueFilter, statusFilter]);

  const uniqueVenues = allMatches ? 
    Array.from(new Set(allMatches.map(match => match.venue)))
      .sort((a, b) => a.localeCompare(b)) : 
    [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} retryFn={refreshData} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Match Schedule</h1>
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

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="teamFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Team</label>
            <select
              id="teamFilter"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={teamFilter || ''}
              onChange={(e) => setTeamFilter(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Teams</option>
              {teams && teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="venueFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Venue</label>
            <select
              id="venueFilter"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={venueFilter}
              onChange={(e) => setVenueFilter(e.target.value)}
            >
              <option value="">All Venues</option>
              {uniqueVenues.map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              id="statusFilter"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Matches</option>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">No matches found with the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;