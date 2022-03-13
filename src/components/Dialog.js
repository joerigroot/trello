import React, { useState, useEffect, useContext } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "@apollo/client";
import {
	DATA_LANES,
	CREATE_TICKET_MUTATION,
	EDIT_TICKET_MUTATION,
} from "../queries/queries";
import { StateContext, DispatchContext } from "../App";

const Dialog = (props) => {
	const {
		dialog,
		formState,
		setFormState,
		dialogType,
		submitted,
		setSubmitted,
		setShowSnackbar,
		dialogTicketId,
	} = props;
	const [isValidForm, setIsValidForm] = useState(false);
	const { loading, error, data } = useQuery(DATA_LANES);
	const [buttonLoading, setButtonLoading] = useState(false);

	const [createTicket] = useMutation(CREATE_TICKET_MUTATION);
	const [editTicket] = useMutation(EDIT_TICKET_MUTATION);

	const dispatch = useContext(DispatchContext);
	const dialogState = useContext(StateContext);

	const handleChange = (event) => {
		const value = event.target.value;
		setFormState({
			...formState,
			[event.target.name]: value,
		});
	};

	const handleClose = () => {
		dispatch({ type: "CLOSE_TICKET_DIALOG" });
	};

	const fullFormValidation = () => {
		for (const [key, value] of Object.entries(formState)) {
			if (value.isValid === false) {
				setIsValidForm(false);
				return;
			} else {
				setIsValidForm(true);
			}
		}
	};

	useEffect(() => {
		fullFormValidation();
	}, [formState]);

	useEffect(() => {
		setIsValidForm(false);
	}, [dialog === false]);

	const handleSubmit = (event, dialogType) => {
		event.preventDefault();
		setButtonLoading(true);

		if (dialogState.type === "addTicket") {
			createTicket({
				variables: {
					input: {
						title: formState.title.value,
						subtitle: formState.subtitle.value,
						description: formState.description,
						lane: formState.lane,
					},
				},
				refetchQueries: [{ query: DATA_LANES }],
			});
			setFormState({ title: "", subtitle: "", description: "", lane: "" });
			setSubmitted(true);
			setShowSnackbar(true);
		} else if (dialogState.type === "editTicket") {
			editTicket({
				variables: {
					input: {
						title: formState.title.value,
						subtitle: formState.subtitle.value,
						description: formState.description,
						lane: formState.lane,
						id: formState.id,
					},
				},
				refetchQueries: [{ query: DATA_LANES }],
			});
			setShowSnackbar(true);
		} else {
			return;
		}
		handleClose();
	};

	if (loading) return <div></div>;
	if (error) return <p>Error :(</p>;

	const dataFromGql = [...data.oneBoard.lanes];

	const lanes = dataFromGql
		.sort((laneA, laneB) => (laneA.position > laneB.position ? 1 : -1))
		.map((lane, index) => (
			<option
				key={index}
				selected={formState.lane === lane.title && "selected"}
				value={lane.title}
			>
				{lane.title}
			</option>
		));

	return (
		<div className="dialog">
			<div id="openModal" className="dialogOpen addDialog">
				<div>
					<div className="flex space-between align-items-center">
						<h2>
							{dialogState.type === "addTicket"
								? "Add ticket"
								: dialogState.type === "editTicket"
								? "Edit ticket"
								: null}
						</h2>
						<button onClick={handleClose} title="Close" className="close">
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
					<form
						onSubmit={(event) => {
							handleSubmit(event, dialogType);
						}}
					>
						<div className="formField">
							<div>
								<label htmlFor="title">Title</label>
							</div>
							<Input
								dialogTicketId={dialogTicketId}
								submitted={submitted}
								id="title"
								type="text"
								name="title"
								isRequired={true}
								minLength="4"
								formState={formState}
								setFormState={setFormState}
							/>
						</div>
						<div className="formField">
							<div>
								<label htmlFor="title">Subtitle</label>
							</div>
							<Input
								dialogTicketId={dialogTicketId}
								submitted={submitted}
								id="subtitle"
								type="text"
								name="subtitle"
								isRequired={true}
								minLength="4"
								formState={formState}
								setFormState={setFormState}
							/>
						</div>
						<div>
							<div>
								<label htmlFor="description">Description</label>
							</div>
							<textarea
								id="description"
								className="input"
								type="text"
								value={formState.description}
								name="description"
								onChange={handleChange}
							></textarea>
						</div>
						<div>
							<select name="lane" onChange={handleChange}>
								<option value="Select lane">-- Select lane --</option>
								{lanes}
							</select>
						</div>
						<div className="flex submit">
							<button
								onClick={handleClose}
								title="Close"
								className="close button button-cancel"
							>
								Cancel
							</button>
							<button
								className={isValidForm ? "button" : "button disabled"}
								type="submit"
								value="Submit"
								disabled={!isValidForm}
							>
								Submit
								{buttonLoading && <FontAwesomeIcon icon={faSpinner} spin />}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
