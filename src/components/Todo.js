import React from "react";
import { db } from "../firebase/config";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

function Todo({ text, todo, todos, setTodos, user }) {


	const deleteHandler = async () => {
		setTodos(todos.filter((e1) => e1.id !== todo.id));
		await updateDoc(doc(db, "users", user.uid), {
			todo: arrayRemove({
				text: todo.text,
				completed: todo.completed,
				id: todo.id,
			}),
		});
	};

	const completeHandler = async () => {
		const toRemove = todos.filter((t) => todo.id == t.id) ;
		setTodos(
			todos.map((item) => {
				if (item.id === todo.id)
					return {
						...item,
						completed: !item.completed,
					};
				return item;
			})
		);
		await updateDoc(doc(db, "users", user.uid), {
			todo: arrayRemove(
				toRemove[0]
			),
		});
		await updateDoc(doc(db, "users", user.uid), {
			todo: arrayUnion({
				...toRemove[0], completed: !toRemove[0].completed
			}),
		});
	};
	return (
		<>
			<div className="todo">
				<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
					{text}
				</li>
				<button onClick={completeHandler} className="complete-btn">
					<i className="fas fa-check"></i>
				</button>
				<button onClick={deleteHandler} className="trash-btn">
					<i className="fas fa-trash"></i>
				</button>
			</div>
		</>
	);
}

export default Todo;
