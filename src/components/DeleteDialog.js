import React, { useContext } from "react";
import {
	DELETE_TICKET_MUTATION,
	DATA_LANES,
	SELECTED_TICKET,
} from "../queries/queries";
import { useMutation, useQuery } from "@apollo/client";
import { StateContext, DispatchContext } from "../App";

const DeleteDialog = (props) => {
	const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION);
	const dialogState = useContext(StateContext);
	const dispatch = useContext(DispatchContext);

	const handleDelete = () => {
		deleteTicket({
			variables: {
				input: {
					id: dialogState.ticketId,
				},
			},
			refetchQueries: [{ query: DATA_LANES }],
		});
		dispatch({ type: "CLOSE_DELETE_TICKET_DIALOG" });
	};

	const handleClose = () => {
		dispatch({ type: "CLOSE_DELETE_TICKET_DIALOG" });
	};

	return (
		<div className="dialog">
			<div id="openModal" className="dialogOpen addDialog">
				<div>
					<h2>Are you sure?</h2>
					<p>
						This item will be deleted immediately? You can't undo this action.
					</p>
					<div className="flex submit">
						<button
							title="Close"
							className="close button button-cancel PEOP"
							onClick={handleClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							value="Submit"
							className="button"
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteDialog;
