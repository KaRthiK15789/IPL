import React from 'react';
import { useData } from '../context/DataContext';
import LiveMatch from '../components/LiveMatch';
import UpcomingMatches from '../components/UpcomingMatches';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home: React.FC = () => {
  const { liveMatch, upcomingMatches, isLoading, error, refreshData } = useData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} retryFn={refreshData} />;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-blue-800 mb-6">IPL 2025 Live Dashboard</h1>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-1">
          <div className="bg-white rounded-md p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {liveMatch ? 'Live Match' : 'Next Match'}
            </h2>
            {liveMatch ? (
              <LiveMatch match={liveMatch} />
            ) : (
              upcomingMatches.length > 0 && (
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-sm">
                  <LiveMatch match={upcomingMatches[0]} />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Matches</h2>
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
        <UpcomingMatches matches={upcomingMatches.slice(0, 3)} />
      </section>
    </div>
  );
};

export default Home;