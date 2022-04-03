import React, { useState, useContext } from "react";
import Ticket from "./Ticket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "@apollo/client";
import {
	DATA_TICKETS,
	EDIT_TICKET_MUTATION,
	DELETE_LANE_MUTATION,
	DATA_LANES,
} from "../queries/queries";
import { LaneDialogContext } from "../App";

const Lane = (props) => {
	const { setFormState, setDialogType, setDialogTicketId, id } = props;
	const [showDropdown, setShowDropdown] = useState(false);
	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const showDialog = useContext(LaneDialogContext);

	const [editTicket] = useMutation(EDIT_TICKET_MUTATION);
	const [deleteLane, { loading }] = useMutation(DELETE_LANE_MUTATION);

	const handleDelete = () => {
		deleteLane({
			variables: {
				input: {
					id: id,
				},
			},
			refetchQueries: [{ query: DATA_LANES }],
		});
	};

	const handleEdit = () => {
		showDialog(true);
	};

	const handleDropdown = () => {
		setShowDropdown((prevState) => !prevState);
	};

	const {
		loading: loadingTickets,
		error: errorTickets,
		data,
	} = useQuery(DATA_TICKETS, {
		variables: { id: id },
	});

	if (loading)
		return (
			<div className="loader-container">
				<div className="loader">Refetching...</div>
			</div>
		);
	if (loadingTickets)
		return (
			<div className="loader-container">
				<div className="loader">Refetching...</div>
			</div>
		);
	if (errorTickets) return <p>Error :(</p>;

	function handleDrop(event) {
		event.preventDefault();
		const getData = event.dataTransfer.getData("text");

		event.target.className === "lane" &&
			event.target
				.querySelector(".tickets-container")
				.appendChild(document.getElementById(getData));
		editTicket({
			variables: {
				input: {
					lane: event.target.getAttribute("id"),
					id: getData,
				},
			},
		});
	}

	return (
		<div
			onDragOver={(event) => handleDragOver(event)}
			onDrop={(event) => handleDrop(event)}
			className="lane"
			id={data.oneLane.title}
		>
			<div className="flex align-items-center space-between">
				<h2>{data.oneLane.title}</h2>
				<div onClick={handleDropdown} className="ellipsis">
					<FontAwesomeIcon icon={faEllipsisH} />
				</div>
			</div>
			<div className={showDropdown ? "dropdown" : "dropdown hidden"}>
				<button className="editButton" value={id} disabled onClick={handleEdit}>
					<FontAwesomeIcon icon={faPen} />
				</button>
				<button
					className={
						data.oneLane.tickets.length !== 0
							? "deleteButton disabled"
							: "deleteButton"
					}
					value={id}
					onClick={handleDelete}
					disabled={data.oneLane.tickets.length !== 0 && true}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
			<div className="tickets-container">
				{data.oneLane.tickets
					.filter((ticket) => ticket.lane.title === data.oneLane.title)
					.map(
						(filteredTicket, index) =>
							data.oneLane.title === filteredTicket.lane.title && (
								<Ticket
									setDialogTicketId={setDialogTicketId}
									setDialogType={setDialogType}
									key={index}
									ticket={filteredTicket}
									setFormState={setFormState}
								/>
							)
					)}
			</div>
		</div>
	);
};

export default Lane;
