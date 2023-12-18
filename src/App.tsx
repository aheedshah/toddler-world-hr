import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import LeaveRequests from "./components/LeaveRequests/LeaveRequests";
import Payroll from "./components/Payroll/Payroll";

const App: React.FC = () => {
	const pathName: string[] = window.location.pathname.toString().split("/");
	const currentPathLength: number = pathName[pathName.length - 1].length;

	return (
		<>
			<Router>
				{currentPathLength > 0 && <Sidebar />}
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/leave-requests' element={<LeaveRequests />} />
					<Route path='/payroll' element={<Payroll />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
