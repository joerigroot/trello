import React, { useContext } from "react";
import ThingsLogo from "../assets/things-logo.svg";
import { LaneDialogContext, DispatchContext } from "../App";

const Header = (props) => {
	const { setSubmitted } = props;
	const showLaneDialog = useContext(LaneDialogContext);
	const dispatch = useContext(DispatchContext);

	const openDialog = (param) => {
		if (param === "addTicket") {
			dispatch({ type: "OPEN_ADD_TICKET_DIALOG" });
			setSubmitted(false);
		} else if (param === "addLane") {
			showLaneDialog(true);
		}
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
				</div>
			</header>
		</div>
	);
};

export default Header;
