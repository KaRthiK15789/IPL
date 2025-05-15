import React from 'react';
import { Match } from '../types';
import { formatDate } from '../utils/dateUtils';

interface LiveMatchProps {
  match: Match;
}

const LiveMatch: React.FC<LiveMatchProps> = ({ match }) => {
  const isLive = match.status === 'live';
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${isLive ? 'border-2 border-red-500' : ''}`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isLive && (
              <span className="flex items-center mr-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-red-600"></span>
                <span className="ml-2">LIVE</span>
              </span>
            )}
            <span>Match #{match.matchNumber}</span>
          </div>
          <div>
            {formatDate(match.date)} | {match.time}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 w-full md:w-2/5">
            <div className="flex items-center mb-2">
              <img src={match.team1.logo} alt={match.team1.name} className="h-12 w-12 mr-2" />
              <div>
                <div className="font-bold text-lg">{match.team1.name}</div>
                <div className="text-sm text-gray-600">{match.team1.shortName}</div>
              </div>
            </div>
            {match.team1Score && (
              <div className="text-xl font-bold">
                {match.team1Score.runs}/{match.team1Score.wickets} 
                <span className="text-sm text-gray-600 ml-1">
                  ({match.team1Score.overs} overs)
                </span>
              </div>
            )}
          </div>
          
          <div className="text-center mb-4 md:mb-0">
            <div className="text-sm text-gray-600 mb-1">{match.venue}</div>
            <div className="text-xl font-bold">VS</div>
            {match.status === 'live' && (
              <div className="text-red-600 font-bold mt-1 animate-pulse">
                {match.result}
              </div>
            )}
            {match.status === 'completed' && match.result && (
              <div className="text-blue-600 font-semibold mt-1 text-sm">
                {match.result}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center md:items-end w-full md:w-2/5">
            <div className="flex items-center mb-2">
              <div className="text-right mr-2">
                <div className="font-bold text-lg">{match.team2.name}</div>
                <div className="text-sm text-gray-600">{match.team2.shortName}</div>
              </div>
              <img src={match.team2.logo} alt={match.team2.name} className="h-12 w-12" />
            </div>
            {match.team2Score && (
              <div className="text-xl font-bold">
                {match.team2Score.runs}/{match.team2Score.wickets} 
                <span className="text-sm text-gray-600 ml-1">
                  ({match.team2Score.overs} overs)
                </span>
              </div>
            )}
          </div>
        </div>
        
        {match.status === 'upcoming' && (
          <div className="text-center text-gray-600 mt-2">
            Match starts in {getDaysUntilMatch(match.date)} days
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate days until match
const getDaysUntilMatch = (matchDate: string): number => {
  const today = new Date();
  const match = new Date(matchDate);
  const diffTime = Math.abs(match.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default LiveMatch;