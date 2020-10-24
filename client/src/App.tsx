import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login'
import Chat from './Chat'

function App():ReactElement {
	console.log('Frontend is now running!');	

	return (
		// Present login page as the root page and a route to the chat page
		<>
			<Router>
				<Login />
				<Switch>
					<Route exact path='/chat'> 
						<Chat />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
