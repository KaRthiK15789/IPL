export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
}

export interface MatchScore {
  runs: number;
  wickets: number;
  overs: number;
}

export interface Match {
  id: number;
  team1: Team;
  team2: Team;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  team1Score?: MatchScore;
  team2Score?: MatchScore;
  matchNumber: number;
}

export interface PointsTableEntry {
  teamId: number;
  team: Team;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
}