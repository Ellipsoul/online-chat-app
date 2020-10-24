import React, { ReactElement, useState, useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login'
import Chat from './Chat'

function App():ReactElement {
	console.log('Frontend is now running!');	

	return (
		// Basic router paths to the login and chat page
		<>
			<Router>
				<Login />
				{/* <Switch>
					<Route exact path='/'>
						<Login />
					</Route>
				</Switch> */}
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
