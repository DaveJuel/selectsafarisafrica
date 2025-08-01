// Helper function to calculate remaining time
export const calculateRemainingTime = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
  
    // Calculate difference in milliseconds
    const timeDifference = deadlineDate - currentDate;
  
    // If the deadline has already passed
    if (timeDifference <= 0) {
      return "Deadline passed";
    }
  
    // Convert time difference to days or weeks
    const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24));
    const weeksRemaining = Math.floor(daysRemaining / 7);
  
    if (weeksRemaining > 0) {
      return `${weeksRemaining} week${weeksRemaining > 1 ? 's' : ''} remaining`;
    } else {
      return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} remaining`;
    }
  };
  