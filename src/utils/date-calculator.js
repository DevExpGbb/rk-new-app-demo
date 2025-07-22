/**
 * Canada Day Calculator - Core calculation logic
 * Determines the day of the week for July 1st (Canada Day) for any given year
 * Uses JavaScript's Date object for accurate day-of-week calculation
 */

/**
 * Calculate the day of the week for July 1st using JavaScript's Date object
 * @param {number} year - The year (1600-3000)
 * @returns {object} Object containing day name, number, and additional info
 */
function calculateCanadaDay(year) {
  // Input validation
  if (!Number.isInteger(year) || year < 1600 || year > 3000) {
    throw new Error('Year must be an integer between 1600 and 3000');
  }

  // Create date for July 1st
  const date = new Date(year, 6, 1); // Month is 0-indexed, so 6 = July
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNumber = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayName = dayNames[dayNumber];
  
  // Additional contextual information
  const isWeekend = dayNumber === 0 || dayNumber === 6; // Sunday or Saturday
  const isWeekday = !isWeekend;
  
  return {
    year: year,
    date: `July 1, ${year}`,
    dayName: dayName,
    dayNumber: dayNumber,
    isWeekend: isWeekend,
    isWeekday: isWeekday,
    funFact: generateFunFact(dayName, isWeekend, year)
  };
}

/**
 * Generate a fun fact about the Canada Day result
 * @param {string} dayName - Name of the day
 * @param {boolean} isWeekend - Whether it's a weekend
 * @param {number} year - The year
 * @returns {string} Fun fact about the date
 */
function generateFunFact(dayName, isWeekend, year) {
  const facts = [];
  
  if (isWeekend) {
    facts.push(`Great news! Canada Day ${year} falls on a ${dayName}, making it a long weekend for celebrations!`);
  } else {
    facts.push(`Canada Day ${year} falls on a ${dayName}, a weekday. Many Canadians will have a statutory holiday.`);
  }

  // Add some special year facts
  if (year === 1867) {
    facts.push("This is the year Canada was founded through Confederation!");
  } else if (year === 2017) {
    facts.push("Canada's 150th anniversary year!");
  } else if (year % 100 === 0) {
    facts.push(`${year} is a century year - how exciting!`);
  } else if (year % 25 === 0) {
    facts.push(`${year} is a quarter-century milestone year.`);
  }

  // Day-specific facts
  switch (dayName) {
    case 'Monday':
      facts.push("A Monday Canada Day means the weekend celebration can extend into the statutory holiday!");
      break;
    case 'Friday':
      facts.push("A Friday Canada Day creates a perfect long weekend opportunity!");
      break;
    case 'Saturday':
      facts.push("Saturday Canada Day celebrations can be extra festive with no work the next day for most people!");
      break;
    case 'Sunday':
      facts.push("Sunday Canada Day often means the statutory holiday is observed on Monday for workers!");
      break;
  }

  return facts.join(' ');
}

/**
 * Validate year input
 * @param {any} input - Input to validate
 * @returns {object} Validation result with isValid flag and parsed year or error message
 */
function validateYear(input) {
  // Convert string to number if needed
  const year = parseInt(input, 10);
  
  if (isNaN(year)) {
    return {
      isValid: false,
      error: 'Please enter a valid number for the year.'
    };
  }
  
  if (year < 1600 || year > 3000) {
    return {
      isValid: false,
      error: 'Year must be between 1600 and 3000 (inclusive).'
    };
  }
  
  return {
    isValid: true,
    year: year
  };
}

module.exports = {
  calculateCanadaDay,
  validateYear,
  generateFunFact
};