import { render } from '@testing-library/react';
import React, {useState, SyntheticEvent} from 'react';
import { Redirect, useHistory, Switch, Route, Link } from 'react-router-dom';
import Chat from './Chat';

export default function Login() {

	let history = useHistory();
	// Sets the user's name
	const [name, setName] = useState("Anonymous");

	const handleSubmitName = (e:SyntheticEvent) => {
		console.log("Name set")
		e.preventDefault()
		return <Link to="/chat" />
		history.push({pathname:'/chat', state: {name: name}})
	}

	return (
		<>
			<form onSubmit={handleSubmitName}>
				<label> 
					Type your name here:
					<input 
					type="text"
					id="name"
					value={name}
					onChange={e => setName(e.target.value)}
					/>
				</label>
				<input type="submit" value="Submit Name" />
			</form>
		</>
	)
}