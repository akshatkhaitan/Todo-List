import React from "react";
import { auth } from "./firebase/config";
import { Link } from "react-router-dom";
import "./Login.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
	
	const handleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
	};
	return (
		<div className="home">
			<div className="heading"> Welcome To Your Personal TODO List !!</div>
			<Link to="/my">
				<div class="google-btn" onClick={handleLogin}>
					<div class="google-icon-wrapper">
						<img
							class="google-icon"
							src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
						/>
					</div>
					<p class="btn-text">
						<b>Sign in with google</b>
					</p>
				</div>
			</Link>
		</div>
	);
}

export default Login;
