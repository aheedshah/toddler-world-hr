import React from "react";
import "./Payroll.scss";
const Payroll = () => {
	return (
		<div className='payroll-container'>
			<h1>Pay Details for January 2023</h1>
			<div className='totals'>
				<h2>Earnings for the Pay Period</h2>
				<table>
					<tbody>
						<tr>
							<td>Basic Salary</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Personal Allowance</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Transport Allowance</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Variable Allowance</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Meal Allowance</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Employer Provident Fund Contribution</td>
							<td>213213</td>
						</tr>
						<tr>
							<td>Employer ESI Contribution</td>
							<td>213213</td>
						</tr>
						<tr>
							<th>Total</th>
							<th>213213</th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Payroll;
