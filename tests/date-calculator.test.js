const { calculateCanadaDay, validateYear, generateFunFact } = require('../src/utils/date-calculator');

describe('Canada Day Calculator', () => {
  describe('validateYear', () => {
    test('should accept valid years within range', () => {
      const result = validateYear('2024');
      expect(result.isValid).toBe(true);
      expect(result.year).toBe(2024);
    });

    test('should accept boundary years', () => {
      expect(validateYear('1600').isValid).toBe(true);
      expect(validateYear('3000').isValid).toBe(true);
    });

    test('should reject years below range', () => {
      const result = validateYear('1599');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('between 1600 and 3000');
    });

    test('should reject years above range', () => {
      const result = validateYear('3001');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('between 1600 and 3000');
    });

    test('should reject non-numeric input', () => {
      const result = validateYear('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid number');
    });

    test('should handle numeric input as number', () => {
      const result = validateYear(2024);
      expect(result.isValid).toBe(true);
      expect(result.year).toBe(2024);
    });
  });

  describe('calculateCanadaDay', () => {
    test('should calculate correct day for known years', () => {
      // Test some known results
      const result2024 = calculateCanadaDay(2024);
      expect(result2024.dayName).toBe('Monday');
      expect(result2024.year).toBe(2024);
      expect(result2024.date).toBe('July 1, 2024');
      expect(result2024.isWeekday).toBe(true);
      expect(result2024.isWeekend).toBe(false);
    });

    test('should calculate correctly for Canada\'s founding year', () => {
      const result1867 = calculateCanadaDay(1867);
      expect(result1867.dayName).toBe('Monday');
      expect(result1867.year).toBe(1867);
      expect(result1867.funFact).toContain('Canada was founded through Confederation');
    });

    test('should handle boundary years', () => {
      const result1600 = calculateCanadaDay(1600);
      expect(result1600.year).toBe(1600);
      expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
        .toContain(result1600.dayName);

      const result3000 = calculateCanadaDay(3000);
      expect(result3000.year).toBe(3000);
      expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
        .toContain(result3000.dayName);
    });

    test('should throw error for invalid years', () => {
      expect(() => calculateCanadaDay(1599)).toThrow('between 1600 and 3000');
      expect(() => calculateCanadaDay(3001)).toThrow('between 1600 and 3000');
      expect(() => calculateCanadaDay('abc')).toThrow();
    });

    test('should correctly identify weekends and weekdays', () => {
      const result = calculateCanadaDay(2024);
      if (result.dayName === 'Saturday' || result.dayName === 'Sunday') {
        expect(result.isWeekend).toBe(true);
        expect(result.isWeekday).toBe(false);
      } else {
        expect(result.isWeekend).toBe(false);
        expect(result.isWeekday).toBe(true);
      }
    });

    test('should have consistent dayNumber with dayName', () => {
      const result = calculateCanadaDay(2024);
      const dayMap = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
      };
      expect(result.dayNumber).toBe(dayMap[result.dayName]);
    });
  });

  describe('generateFunFact', () => {
    test('should include special fact for 1867', () => {
      const fact = generateFunFact('Monday', false, 1867);
      expect(fact).toContain('Canada was founded through Confederation');
    });

    test('should include special fact for 2017', () => {
      const fact = generateFunFact('Saturday', true, 2017);
      expect(fact).toContain('150th anniversary');
    });

    test('should mention weekend for weekend days', () => {
      const fact = generateFunFact('Sunday', true, 2024);
      expect(fact).toContain('long weekend');
    });

    test('should mention weekday for weekdays', () => {
      const fact = generateFunFact('Monday', false, 2024);
      expect(fact).toContain('weekday');
    });

    test('should include century year facts', () => {
      const fact = generateFunFact('Friday', false, 2000);
      expect(fact).toContain('century year');
    });

    test('should include quarter-century facts', () => {
      const fact = generateFunFact('Tuesday', false, 2025);
      expect(fact).toContain('quarter-century milestone');
    });
  });

  describe('Cross-validation with JavaScript Date', () => {
    test('should match JavaScript Date calculation for recent years', () => {
      // Cross-validate with JavaScript's Date object for years where it's reliable
      for (let year = 1970; year <= 2030; year++) {
        const jsDate = new Date(year, 6, 1); // July 1st (month is 0-indexed)
        const jsDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const jsDayName = jsDayNames[jsDate.getDay()];
        
        const ourResult = calculateCanadaDay(year);
        expect(ourResult.dayName).toBe(jsDayName);
      }
    });
  });
});