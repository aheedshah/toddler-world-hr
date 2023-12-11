import React, { useState } from "react";
import "./LeaveRequests.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateSubtraction from "./Helpers/DateSubtraction";
import enGB from "date-fns/locale/en-GB";
registerLocale("enGB", enGB);

const options: { label: string; value: string }[] = [
	{
		label: "",
		value: "",
	},
	{
		label: "Manager 1",
		value: "Manager 1",
	},
	{
		label: "Manager 2",
		value: "Manager 2",
	},
	{
		label: "Manager 3",
		value: "Manager 3",
	},
];

const LeaveRequests: React.FC = () => {
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>();
	const [manager, setManager] = React.useState<string>("");

	const isWeekday = (date: Date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setManager(event.target.value);
	};

	return (
		<div className='payroll-container'>
			<h1>
				<FontAwesomeIcon icon={faCalendarDays} /> Leave Request
			</h1>
			<h2>8 Days of your Annual Leave Remaining</h2>
			<form>
				<p>Start Date</p>
				<DatePicker
					showIcon
					selected={startDate}
					onChange={(date: Date) => setStartDate(date)}
					placeholderText='Start Date'
					locale='enGB'
					dateFormat='dd-MM-yyyy'
					filterDate={isWeekday}
				/>
				<br />
				<p>End Date</p>
				<DatePicker
					showIcon
					selected={endDate}
					onChange={(date: Date) => setEndDate(date)}
					placeholderText='End Date'
					locale='enGB'
					dateFormat='dd-MM-yyyy'
					filterDate={isWeekday}
					minDate={startDate}
					maxDate={new Date("2100-01-01")}
				/>
				<p>Approval Manager</p>
				<select onChange={handleChange}>
					{options.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
				</select>
				<br />
				<p>Comment {manager && <>for {manager}</>} (Optional)</p>
				<textarea placeholder='Type Reason of Leave' />
				<button type='submit' className='submit-button'>
					{startDate && endDate ? (
						<p>
							<FontAwesomeIcon icon={faPaperPlane} />
							Send Request for {DateSubtraction(startDate, endDate)} days
						</p>
					) : (
						<p>
							<FontAwesomeIcon icon={faPaperPlane} /> Send Request
						</p>
					)}
				</button>
			</form>
		</div>
	);
};

export default LeaveRequests;
