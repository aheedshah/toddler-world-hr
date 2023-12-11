import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import LeaveRequests from "./components/LeaveRequests/LeaveRequests";

const App: React.FC = () => {
	const pathName = window.location.pathname;
	const arr = pathName.toString().split("/");
	const currentPath = arr[arr.length - 1];

	return (
		<>
			<Router>
				{currentPath.length > 0 && <Sidebar />}
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/leave-requests' element={<LeaveRequests />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
