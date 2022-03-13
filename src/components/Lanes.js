import React from "react";
import Lane from "./Lane";
import { useQuery } from "@apollo/client";
import { DATA_LANES } from "../queries/queries.js";

const Lanes = (props) => {
	const {
		formState,
		setFormState,
		dialogType,
		setDialogType,
		dialogTicketId,
		setDialogTicketId,
	} = props;

	const { loading, error, data } = useQuery(DATA_LANES);

	if (loading) return <div className="loader">Refetching...</div>;
	if (error) return <p>Error :(</p>;

	const dataFromGql = [...data.oneBoard.lanes];

	const lanes = dataFromGql
		.sort((laneA, laneB) => (laneA.position > laneB.position ? 1 : -1))
		.map((lane) => (
			<Lane
				dialogTicketId={dialogTicketId}
				setDialogTicketId={setDialogTicketId}
				dialogType={dialogType}
				setDialogType={setDialogType}
				key={lane.id}
				formState={formState}
				setFormState={setFormState}
				id={lane.id}
			/>
		));

	return (
		<div className="lanes" id="lanes">
			{lanes}
		</div>
	);
};

export default Lanes;
