const reducer = (state, action) => {
	if (action.type === "OPEN_EDIT_TICKET_DIALOG") {
		return {
			show: true,
			type: "editTicket",
			deleteShow: state.deleteShow,
			ticketId: state.ticketId,
		};
	}
	if (action.type === "OPEN_ADD_TICKET_DIALOG") {
		return {
			show: true,
			type: "addTicket",
			deleteShow: state.deleteShow,
			ticketId: state.ticketId,
		};
	}
	if (action.type === "CLOSE_TICKET_DIALOG") {
		return {
			show: false,
			type: "addTicket",
			deleteShow: state.deleteShow,
			ticketId: state.ticketId,
		};
	}
	if (action.type === "SHOW_DELETE_TICKET_DIALOG") {
		return {
			show: state.show,
			type: state.type,
			deleteShow: true,
			ticketId: action.payload,
		};
	}
	if (action.type === "CLOSE_DELETE_TICKET_DIALOG") {
		return {
			show: state.show,
			type: state.type,
			deleteShow: false,
			ticketId: state.ticketId,
		};
	}
};

export default reducer;
