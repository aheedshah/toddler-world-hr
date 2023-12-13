import DateSubtraction from './DateSubtraction';

describe('DateSubtraction', () => {
	test('it should return 0 when endDate is before startDate', () => {
		const startDate = new Date('2023-01-01');
		const endDate = new Date('2022-12-31');
		expect(DateSubtraction(startDate, endDate)).toBe(0);
	});

	test('it should return the correct number of days excluding weekends', () => {
		const startDate = new Date('2023-01-01'); // Sunday
		const endDate = new Date('2023-01-10'); // Tuesday
		// Expected result: 7 days (Monday to Sunday)
		expect(DateSubtraction(startDate, endDate)).toBe(7);
	});

	test('it should handle cases where the start day is Sunday and end day is Saturday', () => {
		const startDate = new Date('2023-01-01'); // Sunday
		const endDate = new Date('2023-01-07'); // Saturday
		// Expected result: 5 days (Monday to Friday)
		expect(DateSubtraction(startDate, endDate)).toBe(5);
	});

	test('it should handle cases where the start day is Saturday and end day is Sunday', () => {
		const startDate = new Date('2023-01-07'); // Saturday
		const endDate = new Date('2023-01-08'); // Sunday
		// Expected result: 0 days (Weekend only)
		expect(DateSubtraction(startDate, endDate)).toBe(0);
	});
});
