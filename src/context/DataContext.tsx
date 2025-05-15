import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllData } from '../services/dataService';
import { Match, Team, PointsTableEntry } from '../types';

interface DataContextType {
  liveMatch: Match | null;
  upcomingMatches: Match[];
  pointsTable: PointsTableEntry[];
  allMatches: Match[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liveMatch, setLiveMatch] = useState<Match | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [pointsTable, setPointsTable] = useState<PointsTableEntry[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllData();
      setLiveMatch(data.liveMatch);
      setUpcomingMatches(data.upcomingMatches);
      setPointsTable(data.pointsTable);
      setAllMatches(data.allMatches);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Auto-refresh live data every 60 seconds
    const intervalId = setInterval(() => {
      loadData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const value = {
    liveMatch,
    upcomingMatches,
    pointsTable,
    allMatches,
    isLoading,
    error,
    refreshData: loadData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};