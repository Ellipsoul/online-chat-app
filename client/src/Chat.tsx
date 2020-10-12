import React, { useState, SyntheticEvent, useEffect, useRef, ReactElement } from 'react';
import { Container, Button, TextField, Box, Snackbar } from '@material-ui/core';
import './App.css';
import { useLocation } from "react-router-dom";
import Message from "./Message";

export interface chatProps {}  // No props being used right now

// Defining location type to access name state
export interface locationProps {
	pathname: string;
	search: string;
	hash: string;
	key: string;
	state: {name: string};
}

export default function Chat(props: chatProps) {
	// Retrieve props passed from login
	const location = useLocation() as locationProps;

	const [messageField, setMessageField] = useState("");           // Message input field

	const [latestMessageTime, setLatestMessageTime] = useState(0);  // Last received/sent message time
	const latestMessageTimeRef = useRef(latestMessageTime);         // Reference
	latestMessageTimeRef.current = latestMessageTime;
	
	const [messageKey, setMessageKey] = useState(0);				// Div keys state
	const messageKeyRef = useRef(messageKey);                       // Reference
	messageKeyRef.current = messageKey;

	// Send information about input field to backend
	const handleSubmitMessage = (e:SyntheticEvent) => {
		e.preventDefault() // Prevents page from reloading after submitting message

		// Extract message fields
		const name = location.state.name;
		const date = new Date(Date.now());
		const message = messageField;
		const date_unix = date.getTime();

		// Send the message with POST request
		if (messageField.length !== 0 && messageField.length < 1000) {
			fetch("/api/send_message", {
			method:"POST",
			headers: {"content_type":"application/json"},
			body:JSON.stringify(
				{ 
				"name": name,
				"date": date.toString(),
				"message": message,
				"date_unix": date_unix                     // Unix timestamp
				})
			})
			.then(response => { return response.json()})
			console.log("Message sent!")

			setMessageField("")                            // Empty the message container
			// Increment message key and add message locally
			setMessageKey(messageKeyRef.current+1)
			const sent_message:any = 
				<Message
					key={messageKeyRef.current}
					name={name}
					date={date.toString()}
					message={message}
				/>
			setCurrentMessages(currentMessages => [...currentMessages, sent_message])
			setLatestMessageTime(date_unix)  // Update latest message time
			return false
		}
		// Flag down empty/long messages and open snackbar
		else {
			setOpen(true);
		}
	}

	// Enter key functionality for sending messages
	const checkEnterPressed = (e:any) => {
		if (e.key == "Enter") { handleSubmitMessage(e) }
	}

	// Retrieve all messages when page is loaded
	useEffect(()=> {
		retrieve_all_messages();
	}, [])

	const [rawMessages, setRawMessages] = useState<string[][]>([[]]);  // All messages in raw JSON format
	const rawMessagesRef = useRef(rawMessages);                        // Reference handling
	rawMessagesRef.current = rawMessages;

	const [currentMessages, setCurrentMessages] = useState<string[][]>([[]]);   // All messages in JSX format

	// Retrieve all current messages from the server (only really call on first load of page)
	function retrieve_all_messages() {
		fetch("/api/get_all_messages", {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data) => {
			console.log("Retrieved all messages from server");
			setRawMessages(data.all_messages);                  // Update raw messages
			const length:number = data.all_messages.length;     // Handle div keys logic 
			setMessageKey(messageKeyRef.current+length);
			setCurrentMessages(data.all_messages.map((message_info:string[], index:number) => {
				// Generate a message component for every message
				return (
					<Message
						key={messageKeyRef.current - length + index}
						name={message_info[0]}
						date={message_info[1]}
						message={message_info[2]}
					/>
				)
			}));
		})
	}

	// Retrieve only messages that the user has not loaded
	function retrieve_new_messages() {
		// If no raw messages loaded on client side then retrieve all messages from serverm instead
		if (!rawMessagesRef.current.length) { 
			retrieve_all_messages();
			return null
		}
		// Retrieve unix timestamp of last message user has (latest between user sent and others sent)
		let last_message_unix = (parseInt(rawMessagesRef.current[rawMessagesRef.current.length-1][3]) > latestMessageTimeRef.current) ? rawMessagesRef.current[rawMessagesRef.current.length-1][3] : latestMessageTimeRef.current.toString()

		// Defining GET request query
		const queryString = `/api/get_new_messages?time=${last_message_unix}`;
		console.log(`Getting new messages with query: ${queryString} for user ${location.state.name}`)

		// Request new messages with query
		fetch(queryString, {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data => {
			console.log(`Retrieve new messages from server for user ${location.state.name}`)
			console.log("New messages are:")
			console.log(data.new_messages)
			// Render the new messages if some are retrieved
			if (data.new_messages.length) {
				setRawMessages(rawMessages => [...rawMessages, ...data.new_messages])  // Update raw messsages
				const length = data.new_messages.length;        					   // Handle div keys
				setMessageKey(messageKeyRef.current + length)
				const newMessagesJSX = data.new_messages.map((message_info:string[], index:number) => {
					// Generate a message component for every message
					return (
						<Message
							key={messageKeyRef.current - length + index}
							name={message_info[0]}
							date={message_info[1]}
							message={message_info[2]}
						/>
					)
				})
				// Concatenate with currently existing messages
				setCurrentMessages(currentMessages => [...currentMessages, ...newMessagesJSX])
			}
		}))
	}

	// Handle automatic scrolling down
	const messagesEndRef:any = useRef(null);  // Bottom of messages reference
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	};
	useEffect(scrollToBottom, [currentMessages]);

	// Delete all messages (Developer functionality only)
	function delete_messages() {
		fetch("/api/clear_messages", {
			method:"DELETE",
			headers: {"content_type":"application/json"}
		})
		.then(() => {console.log("Messages deleted!")})
	}

	// Determine number of rows for the chat input box
	const height:number = window.innerHeight;
	const numrows:number = Math.floor(height/200);

	// Tracks snackbar status
	const [openSnackBar, setOpen] = useState(false);	 	
	// Snackbar close handling
	const closeSnackBar = () => {
		setOpen(false)
	}

	// IMPORTANT: Asynchronously queries the server for new messages every second
	useEffect(() => {
		const interval = setInterval(() => {
			retrieve_new_messages();
		}, 1000)
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* Main container and section */}
			<Container maxWidth="lg" className="large_chat_container" disableGutters={true}>
				<section className="chat_container">

					{/* Div for displaying and deleting chat messages */}
					<div className="chat_messages_container">
						{/* Div showing all chat messages */}
						<div className="chat_messages_div">
							{ currentMessages }
							<button onClick={delete_messages}> Delete all messages </button>
							<button onClick={retrieve_all_messages}> Show all messages </button>
							<button onClick={retrieve_new_messages}> Show new messages </button>
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

					{/* Warning snackbar for invalid message */}
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