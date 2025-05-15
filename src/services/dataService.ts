import { Match, Team, PointsTableEntry } from '../types';
import { dummyData } from './dummyData';

// Function to fetch live match data from the API
// Falls back to dummy data if the API is not available
export const fetchLiveMatch = async (): Promise<Match | null> => {
  try {
    // Attempt to scrape or fetch real data
    // In a real implementation, this would make an API call or use web scraping
    
    // For now, use dummy data
    return dummyData.liveMatch;
  } catch (error) {
    console.error('Error fetching live match:', error);
    return dummyData.liveMatch;
  }
};

// Function to fetch upcoming matches
export const fetchUpcomingMatches = async (): Promise<Match[]> => {
  try {
    // In a real implementation, this would make an API call or use web scraping
    return dummyData.upcomingMatches;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return dummyData.upcomingMatches;
  }
};

// Function to fetch points table
export const fetchPointsTable = async (): Promise<PointsTableEntry[]> => {
  try {
    // In a real implementation, this would make an API call or use web scraping
    return dummyData.pointsTable;
  } catch (error) {
    console.error('Error fetching points table:', error);
    return dummyData.pointsTable;
  }
};

// Function to fetch all matches
export const fetchAllMatches = async (): Promise<Match[]> => {
  try {
    // In a real implementation, this would make an API call or use web scraping
    return dummyData.allMatches;
  } catch (error) {
    console.error('Error fetching all matches:', error);
    return dummyData.allMatches;
  }
};

// Function to fetch all data at once
export const fetchAllData = async () => {
  const liveMatch = await fetchLiveMatch();
  const upcomingMatches = await fetchUpcomingMatches();
  const pointsTable = await fetchPointsTable();
  const allMatches = await fetchAllMatches();

  return {
    liveMatch,
    upcomingMatches,
    pointsTable,
    allMatches
  };
};