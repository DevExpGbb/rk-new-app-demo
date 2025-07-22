#!/usr/bin/env node

/**
 * Canada Day Calculator CLI
 * Interactive command-line interface for calculating Canada Day
 */

const inquirer = require('inquirer');
const { calculateCanadaDay, validateYear } = require('./src/utils/date-calculator');

console.log('\n🍁 Welcome to the Canada Day Calculator! 🍁');
console.log('━'.repeat(50));
console.log('Find out what day of the week Canada Day falls on');
console.log('for any year between 1600 and 3000.\n');

async function runCalculator() {
  try {
    while (true) {
      const { year } = await inquirer.prompt([
        {
          type: 'input',
          name: 'year',
          message: 'Enter a year (1600-3000):',
          validate: function(input) {
            const validation = validateYear(input);
            return validation.isValid ? true : validation.error;
          }
        }
      ]);

      const validation = validateYear(year);
      if (!validation.isValid) {
        console.log(`❌ Error: ${validation.error}\n`);
        continue;
      }

      const result = calculateCanadaDay(validation.year);
      
      console.log('\n' + '='.repeat(60));
      console.log(`🎉 CANADA DAY ${result.year} RESULT 🎉`);
      console.log('='.repeat(60));
      console.log(`📅 Date: ${result.date}`);
      console.log(`📆 Day: ${result.dayName}`);
      
      if (result.isWeekend) {
        console.log('🎈 Type: Weekend');
      } else {
        console.log('📝 Type: Weekday');
      }
      
      console.log('\n💡 Fun Fact:');
      console.log(result.funFact);
      console.log('='.repeat(60) + '\n');

      const { continueCalculating } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueCalculating',
          message: 'Would you like to calculate for another year?',
          default: true
        }
      ]);

      if (!continueCalculating) {
        break;
      }

      console.log(); // Add some spacing
    }

    console.log('\n🍁 Thank you for using the Canada Day Calculator! 🍁');
    console.log('Happy Canada Day! 🇨🇦\n');

  } catch (error) {
    if (error.isTtyError) {
      console.log('\n❌ This CLI requires an interactive terminal.');
      console.log('Try running it in a different terminal or use the web interface.\n');
    } else {
      console.log(`\n❌ An error occurred: ${error.message}\n`);
    }
    process.exit(1);
  }
}

// Handle command line arguments for non-interactive mode
const args = process.argv.slice(2);
if (args.length > 0) {
  // Non-interactive mode - just calculate for the provided year
  const year = args[0];
  const validation = validateYear(year);
  
  if (!validation.isValid) {
    console.log(`❌ Error: ${validation.error}`);
    console.log('Usage: node cli.js [year]');
    console.log('Example: node cli.js 2024');
    process.exit(1);
  }

  try {
    const result = calculateCanadaDay(validation.year);
    console.log(`\n🎉 Canada Day ${result.year}: ${result.dayName}`);
    console.log(`📅 ${result.date}`);
    console.log(`${result.isWeekend ? '🎈' : '📝'} ${result.isWeekend ? 'Weekend' : 'Weekday'}`);
    console.log(`\n💡 ${result.funFact}\n`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    process.exit(1);
  }
} else {
  // Interactive mode
  runCalculator();
}