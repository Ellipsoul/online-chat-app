import { render } from '@testing-library/react';
import React, {useState, SyntheticEvent, ReactElement} from 'react';
import { Redirect, useHistory, Switch, Route, Link } from 'react-router-dom';
import Chat from './Chat';

export default function Login():ReactElement {

	const [name, setName] = useState("Anonymous");       // Tracks user name state
	const [shouldRedirect, redirectTo] = useState('');   // Tracks redirect location state

	if (shouldRedirect) {
		return (	// Redirect to main chat after name submit
			<Redirect to={{ pathname:shouldRedirect, 
							state:{name:name} }} />
		)  
	} 
	const handleSubmitName = (e:SyntheticEvent) => {
		return redirectTo('/chat')
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