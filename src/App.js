import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Todolist from "./components/Todolist";
import "./App.css";
function App() {
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilterTodos] = useState([]);
  useEffect(() => {
		getLocalTodos();
	}, []);
	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);
	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilterTodos(todos.filter((todo) => todo.completed == true));
				break;
			case "uncompleted":
				setFilterTodos(todos.filter((todo) => todo.completed == false));
				break;
			default:
				setFilterTodos(todos);
				break;
		}
	};

	const saveLocalTodos = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};
	const getLocalTodos = () => {
		if (localStorage.getItem("todos" === null)) {
			localStorage.setItem("todos", JSON.stringify([]));
		} else {
			let localTodos = JSON.parse(
				localStorage.getItem("todos", JSON.stringify(todos))
			);
			setTodos(localTodos);
		}
	};
	return (
		<>
			<div className="App">
				<header>
					<h1>Akshat's Todo List</h1>
				</header>
				<Form
					todos={todos}
					setTodos={setTodos}
					setInputText={setInputText}
					inputText={inputText}
					setStatus={setStatus}
				/>
				<Todolist
					todos={todos}
					setTodos={setTodos}
					filteredTodos={filteredTodos}
				/>
			</div>
		</>
	);
}

export default App;
