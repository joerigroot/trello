import "./App.css";
import Header from "./components/Header";
import Lanes from "./components/Lanes";
import Dialog from "./components/Dialog";
import LaneDialog from "./components/LaneDialog";
import Snackbar from "./components/Snackbar";
import Categories from "./components/Categories";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import React, { createContext, useEffect, useReducer, useState } from "react";
import DeleteDialog from "./components/DeleteDialog";
import reducer from "./store/reducer";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "./queries/queries";
import ThingsLogo from "./assets/things-logo.svg";

export const LaneDialogContext = createContext();
export const TicketDialogContext = createContext();
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
	const [laneDialog, setLaneDialog] = useState(false);
	const [dialogTicketId, setDialogTicketId] = useState(1);
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorLogin, setErrorLogin] = useState(false);
	const [formState, setFormState] = useState({
		title: { value: "", isValid: false },
		subtitle: { value: "", isValid: false },
		description: "",
		lane: "",
		id: "",
	});
	const history = useHistory();

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value);
	};

	useEffect(() => {
		let now = new Date();
		let expiryTime = localStorage.getItem("token-expiry");
		if (
			localStorage.getItem("token") != null &&
			Date.parse(now) < Date.parse(expiryTime)
		) {
			setLoggedInUser(true);
		} else {
			history.push("/login");
		}
	}, []);

	const [loginToken] = useMutation(LOGIN_MUTATION, {
		variables: {
			username: email,
			password: password,
		},
		onError: () => setErrorLogin(true),
		onCompleted: (data) => {
			let expiryTime = new Date();
			expiryTime.setSeconds(
				expiryTime.getSeconds() + data.login.accessExpiresIn
			);
			localStorage.setItem("token", data.login.jwtToken);
			localStorage.setItem("token-expiry", expiryTime);
			localStorage.setItem("refresh-token", data.login.refreshToken);
			setLoggedInUser(true);
			history.push("/dashboard");
		},
	});

	const initialDialogState = {
		show: false,
		type: "",
		deleteShow: false,
		ticketId: 1,
	};
	const [dialogState, dispatchDialog] = useReducer(reducer, initialDialogState);

	return (
		<>
			{!loggedInUser && (
				<Route path="/login">
					<div className="login-form-container">
						<div className="login-form">
							<form onSubmit={(event) => loginToken(event.preventDefault())}>
								<img className="logo" src={ThingsLogo} alt="Logo" />
								{errorLogin && (
									<div className="error-alert">
										Wrong credentials, please try again.
									</div>
								)}
								<div className="form-control">
									<input
										type="email"
										onChange={emailChangeHandler}
										placeholder="Email address"
									/>
								</div>
								<div className="form-control">
									<input
										type="password"
										onChange={passwordChangeHandler}
										placeholder="Password"
									/>
								</div>
								<div className="login-button-containe">
									<button className="button btn-login">Login</button>
								</div>
							</form>
						</div>
					</div>
				</Route>
			)}
			{loggedInUser && (
				<Route path="/dashboard">
					<DispatchContext.Provider value={dispatchDialog}>
						<StateContext.Provider value={dialogState}>
							<LaneDialogContext.Provider value={setLaneDialog}>
								<Header
									setSubmitted={setSubmitted}
									setLoggedInUser={setLoggedInUser}
								/>
								<Categories />
								<Lanes
									dialogTicketId={dialogTicketId}
									setDialogTicketId={setDialogTicketId}
									formState={formState}
									setFormState={setFormState}
								/>
								<LaneDialog
									laneDialog={laneDialog}
									setLaneDialog={setLaneDialog}
								/>
								<Snackbar
									showSnackbar={showSnackbar}
									setShowSnackbar={setShowSnackbar}
								/>
								{dialogState.show && (
									<Dialog
										setShowSnackbar={setShowSnackbar}
										dialogTicketId={dialogTicketId}
										setDialogTicketId={setDialogTicketId}
										submitted={submitted}
										setSubmitted={setSubmitted}
										formState={formState}
										setFormState={setFormState}
									/>
								)}
								{dialogState.deleteShow && <DeleteDialog />}
							</LaneDialogContext.Provider>
						</StateContext.Provider>
					</DispatchContext.Provider>
				</Route>
			)}
		</>
	);
};

export default App;
