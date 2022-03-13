import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { SELECTED_TICKET } from "../queries/queries";
import { StateContext } from "../App";

const Input = (props) => {
	const {
		formState,
		setFormState,
		name,
		minLength,
		isRequired,
		submitted,
		dialogTicketId,
	} = props;

	const [inputError, setInputError] = useState(null);
	const [fieldValue, setFieldValue] = useState("");
	const [editFieldValue, setEditFieldValue] = useState("");

	const dialogState = useContext(StateContext);

	const { data } = useQuery(SELECTED_TICKET, {
		variables: { id: dialogTicketId },
	});

	const handleChange = (event) => {
		const value = event.target.value;
		setFieldValue(submitted ? "" : value);
		setEditFieldValue(value);
	};

	useEffect(() => {
		data !== undefined &&
			data.oneTicket !== null &&
			setEditFieldValue(data.oneTicket[name]);
	}, [dialogTicketId, data, name]);

	const handleBlur = (event) => {
		const value = event.target.value;
		let isValid = false;
		if (isRequired === true) {
			if (value === "") {
				setInputError("This field cant be blank!");
				isValid = false;
			} else if (value.length < minLength) {
				setInputError(
					"This value should have at least " + minLength + " characters."
				);
				isValid = false;
			} else {
				setInputError(null);
				isValid = true;
			}
		}
		setFormState({
			...formState,
			[event.target.name]: { value: value, isValid: isValid },
		});
	};

	return (
		<div>
			<input
				id={name}
				type="text"
				{...(isRequired === true && { required: "true" })}
				name={name}
				value={dialogState.type === "editTicket" ? editFieldValue : fieldValue}
				onBlur={handleBlur}
				onChange={handleChange}
				minLength={minLength}
			/>
			{inputError && <p>{inputError}</p>}
		</div>
	);
};

export default Input;
