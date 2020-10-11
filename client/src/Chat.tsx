import React, { useState, SyntheticEvent, useEffect, useRef, ReactElement } from 'react';
import { Container, Button, TextField, Box, Snackbar } from '@material-ui/core';
import './App.css';
import { useLocation } from "react-router-dom";
import Message from "./Message";

export interface chatProps {}

// Defining location type to access name
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

	// Send information about input field to backend
	const [messageField, setMessageField] = useState("");
	const [latestMessageTime, setLatestMessageTime] = useState(0);
	const latestMessageTimeRef = useRef(latestMessageTime);
  	latestMessageTimeRef.current = latestMessageTime;
	const [messageKey, setMessageKey] = useState(0);
	const messageKeyRef = useRef(messageKey);
	messageKeyRef.current = messageKey;

	const handleSubmitMessage = (e:SyntheticEvent) => {
		e.preventDefault() // Prevents page from reloading after submitting message

		const name = location.state.name;
		const date = new Date(Date.now());
		const message = messageField;
		const date_unix = date.getTime();

		// Send the message
		if (messageField.length !== 0 && messageField.length < 1000) {
			fetch("/send_message", {
			method:"POST",
			headers: {"content_type":"application/json"},
			body:JSON.stringify(
				{ 
				"name": name,
				"date": date.toString(),
				"message": message,
				"date_unix": date_unix  // Last column is unix timestamp
				})
			})
			.then(response => { return response.json()})
			setMessageField("")  // Empty the message container
			setMessageKey(messageKey+1)
			console.log("Message sent!")
			const sent_message:any = 
				<Message
					key={messageKeyRef.current}
					name={name}
					date={date.toString()}
					message={message}
				/>
			setCurrentMessages(currentMessages => [...currentMessages, sent_message])
			setLatestMessageTime(date_unix)
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

	const [newMessages, setNewMessages] = useState<string[][]>([[]])       // New messages in JSON format
	const [rawMessages, setRawMessages] = useState<string[][]>([[]]); 	   // All messages in JSON format
	const rawMessagesRef = useRef(rawMessages);
  	rawMessagesRef.current = rawMessages;
	const [currentMessages, setCurrentMessages] = useState<string[][]>([[]]);  // All messages in JSX

	// Retrieve all current messages from the server
	function retrieve_all_messages() {
		fetch("/get_all_messages", {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data) => {
			setRawMessages(data.all_messages);
			const length:number = data.all_messages.length;
			setMessageKey(messageKey+length)
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
		console.log(rawMessages)
		// If no raw messages loaded on client side then retrieve all messages from server
		if (!rawMessagesRef.current.length) { 
			retrieve_all_messages();
			return null
		}
		// Retrieve unix timestamp of last message user has (latest between user sent and others sent)
		let last_message_unix = (parseInt(rawMessagesRef.current[rawMessagesRef.current.length-1][3]) > latestMessageTimeRef.current) ? rawMessagesRef.current[rawMessagesRef.current.length-1][3] : latestMessageTimeRef.current.toString()
		const queryString = `/get_new_messages?time=${last_message_unix}`;
		console.log(queryString)
		// Request new messages with query
		fetch(queryString, {
			method: "GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data => {
			console.log("New messages are:")
			console.log(data.new_messages)
			console.log("All (raw) messages are:")
			console.log(rawMessages)
			if (data.new_messages.length) {
				setNewMessages(data.new_messages)
				setRawMessages(rawMessages => [...rawMessages, ...data.new_messages])
				const length = data.new_messages.length;
				setMessageKey(messageKey + length)
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
		fetch("/clear_messages", {
			method:"DELETE",
			headers: {"content_type":"application/json"}
		})
		.then(() => {console.log("Messages deleted!")})
	}

	// Determine number of rows for the chat input box
	const height:number = window.innerHeight;
	const numrows:number = Math.floor(height/200);

	const [openSnackBar, setOpen] = useState(false);	 	// Tracks snackbar status
	// Snackbar close handling
	const closeSnackBar = () => {
		setOpen(false);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			retrieve_new_messages();
		}, 1000)
		return () => clearInterval(interval);
	}, []);

	const [timing, setTiming] = useState(0);
	const timingRef = useRef(timing);
	timingRef.current = timing;

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