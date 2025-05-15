import React from 'react';
import { Match } from '../types';
import { formatDate } from '../utils/dateUtils';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  let statusClass = 'bg-gray-600'; // Default for completed
  let statusText = 'Completed';
  
  if (match.status === 'live') {
    statusClass = 'bg-red-600';
    statusText = 'LIVE';
  } else if (match.status === 'upcoming') {
    statusClass = 'bg-blue-600';
    statusText = 'Upcoming';
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white flex justify-between items-center">
        <span>Match #{match.matchNumber}</span>
        <span className={`${statusClass} text-white text-xs font-bold px-2 py-1 rounded`}>
          {statusText}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={match.team1.logo} alt={match.team1.name} className="h-10 w-10 mr-2" />
            <span className="font-semibold">{match.team1.shortName}</span>
          </div>
          
          <div className="text-center">
            <span className="text-gray-600">vs</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold">{match.team2.shortName}</span>
            <img src={match.team2.logo} alt={match.team2.name} className="h-10 w-10 ml-2" />
          </div>
        </div>
        
        {(match.team1Score || match.team2Score) && (
          <div className="flex justify-between text-sm mb-4">
            <div>
              {match.team1Score && `${match.team1Score.runs}/${match.team1Score.wickets}`}
            </div>
            <div>
              {match.team2Score && `${match.team2Score.runs}/${match.team2Score.wickets}`}
            </div>
          </div>
        )}
        
        {match.result && (
          <div className="text-sm text-blue-600 font-medium mb-4">
            {match.result}
          </div>
        )}
        
        <div className="text-xs text-gray-600 flex flex-col">
          <div className="mb-1">
            <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(match.date)} | {match.time}
          </div>
          
          <div>
            <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {match.venue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;