//Helper function for LeaveRequests.tsx to find the number of days between two dates excluding weekends
const DateSubtraction = (startDate: Date, endDate: Date): number => {
	//Base case
	if (endDate < startDate) {
		return 0;
	}

	const millisecondsPerDay = 86400 * 1000; //One day in milliseconds
	startDate.setHours(0, 0, 0, 1); //Start of day
	endDate.setHours(23, 59, 59, 999); //End of midnight

	const diff = endDate.getTime() - startDate.getTime(); // diff in milliseconds
	let days = Math.ceil(diff / millisecondsPerDay);

	const weeks = Math.floor(days / 7);
	days = days - weeks * 2;

	const startDay = startDate.getDay();
	const endDay = endDate.getDay();

	if (startDay - endDay > 1) {
		days = days - 2;
	}

	if (startDay === 0 && endDay !== 6) {
		days = days - 1;
	}

	if (endDay == 6 && startDay != 0) {
		days = days - 1;
	}
	return days;
};

export default DateSubtraction;
