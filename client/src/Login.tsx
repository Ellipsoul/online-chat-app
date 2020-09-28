import React, {useState, SyntheticEvent, ReactElement} from 'react';
import { Container } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import './App.css';
import { TextField, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Login():ReactElement {

	const [name, setName] = useState("");       // Tracks user name state
	const [shouldRedirect, redirectTo] = useState('');   // Tracks redirect location state

	if (shouldRedirect) {
		// Redirect to main chat after name submit
		return (	
			<Redirect to={{ pathname:shouldRedirect, 
							state:{name:name} }} />
		)  
	} 
	const handleSubmitName = (e:SyntheticEvent) => {
		return redirectTo('/chat')
	}

	const height:number = window.innerHeight;
	const width:number = window.innerWidth;
	const input_theme = createMuiTheme({
		typography: {
		  fontSize: 0.025 * (height + width)
		},
	  });

	return (
		<>
			<Container maxWidth="lg" className="large_container">
				<section id="login_container">

					{/* Welcome and short description */}
					<div id="welcome">
						Welcome!
					</div>
					<div id="info"> 
						This is a very simple chat site where you can connect with a unique name and chat with all other connect users!
					</div>

					{/* Tech links */}
					<div id="logos">
						{/* GitHub */}
						<div>
							<img src="/images/github_logo.png" className="github_logo"></img>
						</div>

						{/* React */}
						<div>
							<img src="/images/react_logo.png" className="react_logo"></img>
						</div>

						{/* Typescript */}
						<div>
							<img src="images/typescript_logo.png" className="typescript_logo"></img>
						</div>
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
									placeholder="Name"
								/>
							</ThemeProvider>
						</div>
						
						<div className="name_submit">
							<Button 
								variant="contained" 
								color="primary" 
								className="name_button"
								onClick={handleSubmitName}
							>
								Start Chatting!	
							</Button> 
						</div>

					</div>

				</section>
			</Container>
		</>
	)
}