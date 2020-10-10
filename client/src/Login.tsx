import React, { useState, SyntheticEvent, ReactElement, createContext } from 'react';
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

	if (shouldRedirect) {
		// Redirect to main chat after name submit
		return (
			<Redirect to={{ 
				pathname:shouldRedirect, 
				state: { name: name }
			}} />
		)
	}

	const handleSubmitName = (e:SyntheticEvent) => {
		if (!name.length) {
			setAlertMessage("Please enter a non-empty name")
			setOpen(true);
		}
		else if (name.length > 20) {
			setAlertMessage("Please enter a shorter name!")
			setOpen(true);
		} else {
			return redirectTo('/chat');
		}
	}

	const height:number = window.innerHeight;
	const width:number = window.innerWidth;
	const input_theme = createMuiTheme({
		typography: {
		  fontSize: 0.03 * height
		}
	  });

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
						This is a very simple chat site where you can connect with a unique name and chat with all other connect users! This app was made with:
					</div>

					{/* Tech links */}
					<div id="logos">
						{/* GitHub */}
						<div>
							<a href="https://github.com/Ellipsoul" target="_blank">
								<img src="/images/github_logo.png" className="github_logo"></img>
							</a>
						</div>

						{/* React */}
						<div>
							<a href="https://reactjs.org/" target="_blank">
								<img src="/images/react_logo.png" className="react_logo"></img>
							</a>
						</div>

						{/* Typescript */}
						<a href="https://www.typescriptlang.org/" target="_blank">
							<div>
								<img src="images/typescript_logo.png" className="typescript_logo"></img>
							</div>
						</a>
					</div>

					{/* User login area */}
					<div id="name_login">
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