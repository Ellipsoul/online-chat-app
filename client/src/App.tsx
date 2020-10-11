import React, { ReactElement, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './Login'
import Chat from './Chat'

function App():ReactElement {
	console.log('Frontend is now running!');	

	return (
		// Basice router paths to the login and chat page
		<>
			<Router>
				<Switch>
					<Redirect exact from='/' to='/login'> </Redirect>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/chat'>
						<Chat />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
