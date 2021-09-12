import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Todolist from "./components/Todolist";
import { auth } from "./firebase/config";
import { Link } from "react-router-dom";
import { db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";

function Mytodo({ user }) {
	const [inputText, setInputText] = useState("");
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilterTodos] = useState([]);
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		filterHandler();
	}, [todos , status]);

	useEffect(async () => {
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);
		setTodos(docSnap.data().todo);
	}, );

	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilterTodos(todos?.filter((todo) => todo.completed == true));
				break;
			case "uncompleted":
				setFilterTodos(todos?.filter((todo) => todo.completed == false));
				break;
			default:
				setFilterTodos(todos);
				break;
		}
	};
	return (
		<div className="MyTodo">
			<header>
				<h1>{user.displayName}'s Todo List</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				inputText={inputText}
				setStatus={setStatus}
				user={user}
			/>
			<Todolist
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
				user={user}
			/>
			<Link to="/">
				<button
					className="logout"
					onClick={() => {
						auth.signOut();
					}}
				>
					Logout :(
				</button>
			</Link>
		</div>
	);
}

export default Mytodo;
