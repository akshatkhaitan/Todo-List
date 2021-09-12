import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Mytodo from "./Mytodo";
import { auth, db } from "./firebase/config";
import firebase from "./firebase/config";
function App() {
	const [user, setUser] = useState({});
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const ref = db.collection("users").doc(`${user.uid}`);
				ref.get().then((doc) => {
					if (!doc.exists) {
						ref.set({
							displayName: user.displayName,
							photoURL: user.photoURL,
							email: user.email,
							createdAt: firebase.firestore.FieldValue.serverTimestamp(),
							todo: [],
							uid: user.uid,
						});
					}
				});
				ref.onSnapshot((snapShot) => {
					setUser({
						...snapShot.data(),
					});
				});
			}
		});
	}, []);

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact>
						<Login />
					</Route>
				</Switch>
				<Switch>
					<Route path="/my">
						<Mytodo user={user} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
