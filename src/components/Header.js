import React, { useContext } from "react";
import ThingsLogo from "../assets/things-logo.svg";
import { LaneDialogContext, DispatchContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = (props) => {
	const { setSubmitted, setLoggedInUser } = props;
	const showLaneDialog = useContext(LaneDialogContext);
	const dispatch = useContext(DispatchContext);
	const history = useHistory();

	const openDialog = (param) => {
		if (param === "addTicket") {
			dispatch({ type: "OPEN_ADD_TICKET_DIALOG" });
			setSubmitted(false);
		} else if (param === "addLane") {
			showLaneDialog(true);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("token-expiry");
		localStorage.removeItem("refresh-token");
		history.push("/login");
		setLoggedInUser(false);
	};

	return (
		<div className="header" id="header">
			<header className="flex align-items-center space-between">
				<img className="logo" src={ThingsLogo} alt="Logo" />
				<div>
					<button onClick={() => openDialog("addTicket")} className="button">
						Add Ticket
					</button>
					<button
						onClick={() => openDialog("addLane")}
						className="button button-grey"
					>
						Add Lane
					</button>
					<button onClick={logout} className="button button-logout">
						Logout
					</button>
				</div>
			</header>
		</div>
	);
};

export default Header;
