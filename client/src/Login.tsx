import React, { useState, SyntheticEvent, ReactElement } from 'react';
import { Container } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import './App.css';
import { TextField, Button, Snackbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Login():ReactElement {

	const [name, setName] = useState("");  			    	// Tracks user name state
	const [shouldRedirect, redirectTo] = useState('');  	// Tracks redirect location state
	const [openSnackBar, setOpen] = useState(false);	 	// Tracks snackbar status
	const [alertMessage, setAlertMessage] = useState(""); 	// Tracks alert message

	// Occurs when a redirect path state is detected
	if (shouldRedirect) {
		// Redirect to main chat after name submit
		return (
			<Redirect to={{ 
				pathname:shouldRedirect, 
				state: { name: name }
			}} />
		)
	}

	// Handling name submission
	const handleSubmitName = (e:SyntheticEvent) => {
		// No name entered
		if (!name.length) {
			setAlertMessage("Please enter a non-empty name")
			setOpen(true);
		}
		// Name too long
		else if (name.length > 20) {
			setAlertMessage("Please enter a shorter name!")
			setOpen(true);
		} 
		// Successful redirect to chat
		else {
			return redirectTo('/chat');
		}
	}

	// Used to determine button and input field size
	const height:number = window.innerHeight;
	const width:number = window.innerWidth;

	// Theme for name input field
	const input_theme = createMuiTheme({
		typography: {
		  fontSize: 0.03 * height
		}
	  });

	// Theme for button
	const button_theme = createMuiTheme({
		typography: {
			fontSize: 0.02 * width + 0.02 * height
		}
	})
	
	// Enter key functionality for submitting name
	const checkEnterPressed = (e:any) => {
		if (e.key == "Enter") {
			handleSubmitName(e)
		}
	}

	// Snackbar close handling
	const closeSnackBar = () => {
		setOpen(false);
	}

	return (
		<>
			<Container maxWidth="lg" className="large_login_container">
				<section id="login_container">

					{/* Welcome and short description */}
					<div id="welcome">
						Welcome!
					</div>
					<div id="info"> 
						This is a simple chat site where you can connect with your name and chat with all connected users! Made with: 
					</div>

					{/* Tech links */}
					<div id="logos">
						{/* GitHub */}
						<div>
							<a href="https://github.com/Ellipsoul" target="_blank">
								<img src="/online-chat-app/images/github_logo.png" className="logo"></img>
							</a>
						</div>

						{/* React */}
						<div>
							<a href="https://reactjs.org/" target="_blank">
								<img src="/online-chat-app/images/react_logo.png" className="logo"></img>
							</a>
						</div>

						{/* Typescript */}
						<div>
							<a href="https://www.typescriptlang.org/" target="_blank">
								<img src="/online-chat-app/images/typescript_logo.png" className="logo"></img>
							</a>
						</div>

						{/* Python */}
						<div>
							<a href="https://www.python.org/" target="_blank">
								<img src="/online-chat-app/images/python_logo.png" className="logo"></img>
							</a>
						</div>

						{/* Flask */}
						<div>
							<a href="https://flask.palletsprojects.com/en/1.1.x/" target="_blank">
								<img src="/online-chat-app/images/flask_logo.png" className="logo"></img>
							</a>
						</div>

						{/* Heroku */}
						<div>
							<a href="https://www.heroku.com/" target="_blank">
								<img src="/online-chat-app/images/heroku_logo.png" className="logo"></img>
							</a>
						</div>
					</div>

					{/* User login area */}
					<div id="name_login">
						{/* Name input field */}
						<div className="name_input"> 
							<ThemeProvider theme={input_theme}>
								<TextField
									fullWidth
									multiline
									rows={1}
									value={name}
									onChange={e => setName(e.target.value)}
									variant="outlined"
									color="primary"
									placeholder="Enter name"
									onKeyDown={checkEnterPressed}
								/>
							</ThemeProvider>
						</div>
						{/* Submit button */}
						<div className="name_submit_div">
							<ThemeProvider theme={button_theme}>
								<Button 
									variant="contained" 
									color="primary" 
									className="name_button"
									onClick={handleSubmitName}
								>
									Start Chatting!	
								</Button> 
							</ThemeProvider>
						</div>

						{/* Invalid name warning snackbar */}
						<Snackbar
							color="secondary"
							anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
							}}
							open={openSnackBar}
							onClose={closeSnackBar}
							autoHideDuration={3000}
							message={alertMessage}
						/>
					</div>

				</section>
			</Container>
		</>
	)
}