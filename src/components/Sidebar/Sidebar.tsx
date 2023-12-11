import React from "react";
import "./Sidebar.scss";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faClipboardUser, faUmbrellaBeach, faMoneyBill, faFile } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "usehooks-ts";

const Sidebars: React.FC = () => {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	return (
		<Sidebar backgroundColor='orange' color='#8ba1b7' className='sidebar' collapsed={!isDesktop}>
			<img src='/images/logo.webp' alt='logo' />
			<Menu>
				<MenuItem component={<Link to='/dashboard' />} icon={<FontAwesomeIcon icon={faGauge} />}>
					Dashboard
				</MenuItem>
				<MenuItem component={<Link to='#' />} icon={<FontAwesomeIcon icon={faClipboardUser} />}>
					Attendance
				</MenuItem>
				<MenuItem component={<Link to='/leave-requests' />} icon={<FontAwesomeIcon icon={faUmbrellaBeach} />}>
					Leave Requests
				</MenuItem>
				<MenuItem component={<Link to='/payroll' />} icon={<FontAwesomeIcon icon={faMoneyBill} />}>
					Payroll Info
				</MenuItem>
				<MenuItem component={<Link to='#' />} icon={<FontAwesomeIcon icon={faFile} />}>
					Documents
				</MenuItem>
			</Menu>
		</Sidebar>
	);
};

export default Sidebars;
