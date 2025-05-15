import React from 'react';
import { Match } from '../types';
import MatchCard from './MatchCard';
import { Link } from 'react-router-dom';

interface UpcomingMatchesProps {
  matches: Match[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No upcoming matches scheduled.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      
      {matches.length > 0 && (
        <div className="mt-4 text-center">
          <Link 
            to="/schedule" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View full schedule
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingMatches;