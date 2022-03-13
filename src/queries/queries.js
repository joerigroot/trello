import { gql } from "@apollo/client";

const DATA_LANES = gql`
	{
		oneBoard {
			id
			title
			lanes {
				id
				title
				position
				tickets {
					id
					title
					subtitle
					description
				}
			}
		}
	}
`;

const DATA_TICKETS = gql`
	{
		oneLane(where: { id: { eq: $id } }) {
			id
			title
			tickets {
				id
				title
				subtitle
				description
				lane {
					title
				}
			}
		}
	}
`;

const SELECTED_TICKET = gql`
	{
		oneTicket(where: { id: { eq: $id } }) {
			id
			title
			subtitle
			description
			lane {
				title
			}
		}
	}
`;

const CREATE_LANE_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "lanes/create", input: $input)
	}
`;

const DELETE_LANE_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "lanes/delete", input: $input)
	}
`;

const EDIT_LANE_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "lanes/edit", input: $input)
	}
`;

const CREATE_TICKET_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "tickets/create", input: $input)
	}
`;

const EDIT_TICKET_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "tickets/edit", input: $input)
	}
`;

const DELETE_TICKET_MUTATION = gql`
	mutation action($input: ActionInput!) {
		actionb5(uuid: "tickets/delete", input: $input)
	}
`;

const LOGIN_MUTATION = gql`
	mutation login {
		login(
			authProfileUuid: "698548cc36f94538a006aef703bf7658"
			username: $username
			password: $password
		) {
			jwtToken
			refreshToken
			accessExpiresIn
		}
	}
`;

export {
	DATA_LANES,
	DATA_TICKETS,
	CREATE_TICKET_MUTATION,
	SELECTED_TICKET,
	EDIT_TICKET_MUTATION,
	DELETE_TICKET_MUTATION,
	CREATE_LANE_MUTATION,
	DELETE_LANE_MUTATION,
	EDIT_LANE_MUTATION,
	LOGIN_MUTATION,
};
