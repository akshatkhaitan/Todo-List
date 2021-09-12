import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD9X_sYGE2Kd_V93RVDnyNzKfZg4qWVLMw",
	authDomain: "todo-list-29c04.firebaseapp.com",
	projectId: "todo-list-29c04",
	storageBucket: "todo-list-29c04.appspot.com",
	messagingSenderId: "253000937218",
	appId: "1:253000937218:web:86a843c51f5e1b241bdc1b",
	measurementId: "G-KGY9T929JP",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export const authUser = (user) => {
	const ref = db.collection("users").doc(`${user.uid}`);
	console.log(ref);
	ref.get().then((doc) => {
		if (doc.exists) {
			return ref;
		} else {
			ref.update({
				displayName: user.displayName,
				photoURL: user.photoURL,
				email: user.email,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				todo: [],
				uid: user.uid,
			});
			return ref;
		}
	});
};

export default firebase;
