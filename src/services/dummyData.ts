import { Match, Team, PointsTableEntry } from '../types';

// Team data
const teams: Team[] = [
  { id: 1, name: 'Mumbai Indians', shortName: 'MI', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Medium/MI.png' },
  { id: 2, name: 'Chennai Super Kings', shortName: 'CSK', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Medium/CSK.png' },
  { id: 3, name: 'Royal Challengers Bangalore', shortName: 'RCB', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Medium/RCB.png' },
  { id: 4, name: 'Kolkata Knight Riders', shortName: 'KKR', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Medium/KKR.png' },
  { id: 5, name: 'Delhi Capitals', shortName: 'DC', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Medium/DC.png' },
  { id: 6, name: 'Punjab Kings', shortName: 'PBKS', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Medium/PBKS.png' },
  { id: 7, name: 'Rajasthan Royals', shortName: 'RR', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Medium/RR.png' },
  { id: 8, name: 'Sunrisers Hyderabad', shortName: 'SRH', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Medium/SRH.png' },
  { id: 9, name: 'Gujarat Titans', shortName: 'GT', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Medium/GT.png' },
  { id: 10, name: 'Lucknow Super Giants', shortName: 'LSG', logo: 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Medium/LSG.png' },
];

// Live match
const liveMatch: Match = {
  id: 101,
  team1: teams[0], // MI
  team2: teams[1], // CSK
  date: '2025-04-15',
  time: '19:30',
  venue: 'Wankhede Stadium, Mumbai',
  status: 'live',
  team1Score: { runs: 152, wickets: 6, overs: 18.3 },
  team2Score: { runs: 148, wickets: 8, overs: 20.0 },
  result: 'Mumbai Indians need 10 runs in 9 balls',
  matchNumber: 25
};

// Upcoming matches
const upcomingMatches: Match[] = [
  {
    id: 102,
    team1: teams[2], // RCB
    team2: teams[3], // KKR
    date: '2025-04-16',
    time: '15:30',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    status: 'upcoming',
    matchNumber: 26
  },
  {
    id: 103,
    team1: teams[4], // DC
    team2: teams[5], // PBKS
    date: '2025-04-16',
    time: '19:30',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'upcoming',
    matchNumber: 27
  },
  {
    id: 104,
    team1: teams[6], // RR
    team2: teams[7], // SRH
    date: '2025-04-17',
    time: '19:30',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'upcoming',
    matchNumber: 28
  },
];

// Points table
const pointsTable: PointsTableEntry[] = [
  { teamId: 9, team: teams[8], matches: 6, won: 5, lost: 1, tied: 0, noResult: 0, points: 10, netRunRate: 1.25 },
  { teamId: 10, team: teams[9], matches: 6, won: 5, lost: 1, tied: 0, noResult: 0, points: 10, netRunRate: 1.15 },
  { teamId: 4, team: teams[3], matches: 6, won: 4, lost: 2, tied: 0, noResult: 0, points: 8, netRunRate: 0.8 },
  { teamId: 2, team: teams[1], matches: 6, won: 4, lost: 2, tied: 0, noResult: 0, points: 8, netRunRate: 0.6 },
  { teamId: 7, team: teams[6], matches: 6, won: 3, lost: 3, tied: 0, noResult: 0, points: 6, netRunRate: 0.2 },
  { teamId: 8, team: teams[7], matches: 6, won: 3, lost: 3, tied: 0, noResult: 0, points: 6, netRunRate: -0.1 },
  { teamId: 3, team: teams[2], matches: 6, won: 2, lost: 4, tied: 0, noResult: 0, points: 4, netRunRate: -0.2 },
  { teamId: 5, team: teams[4], matches: 6, won: 2, lost: 4, tied: 0, noResult: 0, points: 4, netRunRate: -0.5 },
  { teamId: 1, team: teams[0], matches: 6, won: 1, lost: 5, tied: 0, noResult: 0, points: 2, netRunRate: -0.8 },
  { teamId: 6, team: teams[5], matches: 6, won: 1, lost: 5, tied: 0, noResult: 0, points: 2, netRunRate: -1.2 },
];

// All matches (including past matches)
const pastMatches: Match[] = [
  {
    id: 1,
    team1: teams[2], // RCB
    team2: teams[9], // LSG
    date: '2025-03-25',
    time: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    status: 'completed',
    team1Score: { runs: 186, wickets: 6, overs: 20.0 },
    team2Score: { runs: 187, wickets: 3, overs: 19.2 },
    result: 'Lucknow Super Giants won by 7 wickets',
    matchNumber: 1
  },
  {
    id: 2,
    team1: teams[8], // GT
    team2: teams[1], // CSK
    date: '2025-03-26',
    time: '19:30',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'completed',
    team1Score: { runs: 194, wickets: 4, overs: 20.0 },
    team2Score: { runs: 178, wickets: 7, overs: 20.0 },
    result: 'Gujarat Titans won by 16 runs',
    matchNumber: 2
  },
  // Add more past matches as needed
];

// Combine all matches
const allMatches: Match[] = [...pastMatches, liveMatch, ...upcomingMatches];

// Export all dummy data
export const dummyData = {
  teams,
  liveMatch,
  upcomingMatches,
  pointsTable,
  allMatches
};