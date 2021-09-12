import React from "react";
import generateUniqueId from 'generate-unique-id';
import {doc, updateDoc, arrayUnion} from "firebase/firestore"
import { db } from "../firebase/config";


function Form({setInputText , todos , setTodos, inputText, setStatus, user}) {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    const submitToddoHandler = async(e) => {
        e.preventDefault();
		const key = generateUniqueId();
        setTodos([...todos, {text: inputText, completed: false , id: key }]);
		await updateDoc(doc(db, "users", user.uid) , {
			todo: arrayUnion({text: inputText, completed: false , id: key })
		});
        setInputText("");
    }


    const statusHandler = (e) => {
        setStatus(e.target.value);
    }


	return (
		<>
			<form>
				<input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
				<button className="todo-button" type="submit">
					<i onClick={submitToddoHandler} className="fas fa-plus-square"></i>
				</button>
				<div className="select">
					<select onChange={statusHandler} name="todos" className="filter-todo">
						<option value="all">All</option>
						<option value="completed">Completed</option>
						<option value="uncompleted">Uncompleted</option>
					</select>
				</div>
			</form>
		</>
	);
}

export default Form;
