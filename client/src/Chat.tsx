import React, { useState, SyntheticEvent, useEffect, useRef } from 'react';
import { Container, Button, TextField, Box, Snackbar } from '@material-ui/core';
import './App.css';
import { useLocation } from "react-router-dom";
import Message from "./Message";

export interface chatProps {}

export interface locationProps {
	pathname: string;
	search: string;
	hash: string;
	key: string;
	state: {name: string};
}

// export interface MessageStructure {
// 	name: string;
// 	date: Date;
// 	message: string;
// }

export default function Chat(props: chatProps) {
	// Retrieve props passed from login
	const location = useLocation() as locationProps;
	// Send information about input field to backend
	const [messageField, setMessageField] = useState("");
	const handleSubmitMessage = (e:SyntheticEvent) => {
		e.preventDefault() // Prevents page from reloading after submitting message
		// Send the message
		if (messageField.length !== 0 && messageField.length < 1000) {
			var d = new Date(Date.now());
			fetch("/send_message", {
			method:"POST",
			headers: {"content_type":"application/json"},
			body:JSON.stringify(
				{ 
				"name": location.state.name,
				"date": d.toString(),
				"message": messageField,
				"date_unix": d.getTime()
				})
			})
			.then(response => { return response.json()})
			setMessageField("")
			console.log("Message sent!")
			return false
			}
		// Flag down empty messages
		else {
			setOpen(true);
		}
	}

	// Enter key functionality for sending messages
	const checkEnterPressed = (e:any) => {
		if (e.key == "Enter") {
			handleSubmitMessage(e)
		}
	}

	// Retrieve all messages when page is loaded
	useEffect(()=> {
		retrieve_all_messages();
	}, [])

	// Retrieve all current messages from the server
	const [rawMessages, setRawMessages] = useState([]);
	const [currentMessages, setCurrentMessages] = useState(null);
	function retrieve_all_messages() {
		fetch("/get_all_messages", {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data) => {
			setRawMessages(data.all_messages);
			console.log(rawMessages);
			setCurrentMessages(data.all_messages.map((message_info:string[]) => {
				// Generate a message component for every message
				return (
					<Message
						name={message_info[0]}
						date={message_info[1]}
						message={message_info[2]}
					/>
				)
			}));
		})
	}

	function retrieve_new_messages() {
		let last_message_unix = rawMessages[rawMessages.length-1][3]
		const queryString = `/get_new_messages?time=${last_message_unix}`;
		console.log(queryString)
		fetch(queryString, {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => {res.json()})
		.then((data => {return null}))
	}

	// Delete all messages (Developer functionality only)
	function delete_messages() {
		fetch("/clear_messages", {
			method:"DELETE",
			headers: {"content_type":"application/json"}
		})
	}

	// Determine number of rows for the chat input box
	const height:number = window.innerHeight;
	const numrows:number = Math.floor(height/200);

	// Handle automatic scrolling down (Later)
	const messagesEndRef:any = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	};
	useEffect(scrollToBottom, [currentMessages]);

	const [openSnackBar, setOpen] = useState(false);	 	// Tracks snackbar status
	// Snackbar close handling
	const closeSnackBar = () => {
		setOpen(false);
	}

	return (
		<>
			{/* Main container and section */}
			<Container maxWidth="lg" className="large_chat_container" disableGutters={true}>
				<section className="chat_container">

					{/* Div for displaying and deleting chat messages */}
					<div className="chat_messages_container">

					{/* Div showing all chat messages */}
					<div className="chat_messages_div">
						<button onClick={delete_messages}> Delete all messages </button>
						<button onClick={retrieve_all_messages}> Show all messages </button>
						<button onClick={retrieve_new_messages}> Show new messages </button>
						{ currentMessages }
						<div ref={messagesEndRef} />
					</div>

					</div>

					{/* Div for chat message input field */}
					<div id="input_field_div">
						<Box width="100%">
							<TextField
								label={`Say something, ${location.state.name} :)`}
								fullWidth
								multiline
								rows={numrows}
								value={messageField}
								onChange={e => setMessageField(e.target.value)}
								variant="outlined"
								color="primary"
								onKeyDown={checkEnterPressed}
							/>
						</Box>
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
						message="Your message is either empty or too long!"
					/>

					{/* Submit button div */}
					<div className="submit_button_div"> 
						<Button 
							variant="contained" 
							color="primary" 
							className="submit_button"
							onClick={handleSubmitMessage}
						> 
							<span id="submit_button_text"> Send </span>
						</Button>
					</div>

				</section>
			</Container>
		</>
	)
}