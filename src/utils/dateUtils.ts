// Format a date string like '2023-04-15' to 'April 15, 2023'
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format a time string like '19:30' to '7:30 PM'
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get relative time (e.g., "starts in 2 days", "started 3 hours ago")
export const getRelativeTime = (dateString: string, timeString: string): string => {
  const now = new Date();
  const [hours, minutes] = timeString.split(':').map(Number);
  const matchDate = new Date(dateString);
  matchDate.setHours(hours, minutes);
  
  const diffMs = matchDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMs < 0) {
    // Match has already started
    if (Math.abs(diffMs) < 1000 * 60 * 60 * 3) {
      return 'Live now';
    }
    
    const hoursAgo = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
    if (hoursAgo < 24) {
      return `Started ${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const daysAgo = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    return `Started ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else {
    // Match has not started yet
    if (diffDays === 0) {
      const hoursRemaining = Math.floor(diffMs / (1000 * 60 * 60));
      if (hoursRemaining === 0) {
        const minutesRemaining = Math.floor(diffMs / (1000 * 60));
        return `Starts in ${minutesRemaining} ${minutesRemaining === 1 ? 'minute' : 'minutes'}`;
      }
      return `Starts in ${hoursRemaining} ${hoursRemaining === 1 ? 'hour' : 'hours'}`;
    }
    
    return `Starts in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
  }
};