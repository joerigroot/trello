import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CREATE_LANE_MUTATION, DATA_LANES } from "../queries/queries";
import { useMutation } from "@apollo/client";

const LaneDialog = (props) => {
	const { laneDialog, setLaneDialog } = props;
	const [formState, setFormState] = useState({
		name: "",
		position: null,
	});

	const [createLane] = useMutation(CREATE_LANE_MUTATION);

	function handleChange(event) {
		const value = event.target.value;
		setFormState({
			...formState,
			[event.target.name]: value,
		});
	}

	const handleClose = () => {
		setLaneDialog(false);
	};

	function handleSubmit(event) {
		event.preventDefault();
		createLane({
			variables: {
				input: {
					title: formState.name,
					position: formState.position,
				},
			},
			refetchQueries: [{ query: DATA_LANES }],
		});
		setFormState({ name: "", position: "" });
		setLaneDialog(false);
	}

	return (
		<div className="dialog">
			<div
				id="openLaneModal"
				className={laneDialog ? "dialogOpen addDialog" : "addDialog"}
			>
				<div>
					<div className="flex space-between align-items-center">
						<h2>Add lane</h2>
						<a
							href="#close"
							title="Close"
							className="close"
							onClick={handleClose}
						>
							<FontAwesomeIcon icon={faTimes} />
						</a>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="formField">
							<div>
								<label htmlFor="title">Name</label>
							</div>
							<input
								type="text"
								value={formState.name}
								name="name"
								onChange={handleChange}
							/>
						</div>
						<div className="formField">
							<div>
								<label htmlFor="title">Position</label>
							</div>
							<input
								type="number"
								value={formState.position}
								name="position"
								onChange={handleChange}
							/>
						</div>
						<div className="flex submit">
							<a
								href="#close"
								title="Close"
								className="close button button-cancel"
								onClick={handleClose}
							>
								Cancel
							</a>
							<input className="button" type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LaneDialog;
