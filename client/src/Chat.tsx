import React, { useState, SyntheticEvent } from 'react';
import { Container, Button, TextField, Box } from '@material-ui/core';
import './App.css';

export interface chatProps {
}

export default function Chat(props: chatProps) {

	// Send information about input field to backend
	const [messageField, setMessageField] = useState("");
	const handleSubmitMessage = (e:SyntheticEvent) => {
		e.preventDefault() // Prevents page from reloading after submitting message
		// Send the message
		if (messageField.length !== 0) {
			var d = new Date(Date.now());
			fetch("/send_message", {
			method:"POST",
			headers: {"content_type":"application/json"},
			body:JSON.stringify(
				{ 
				// "name": name,
				"date": d.toString(),
				"message": messageField,
				})
			})
			.then(response => { return response.json()})
			console.log("Message sent!")
			return false
			}
		// Flag down empty messages
		else {
			console.log("Please send a non-empty message")
		}
	}

	// Retrieve all current messages from the server
	const [currentMessages, setCurrentMessages] = useState("");
	function show_messages() {
		fetch("/get_messages", {
			method:"GET",
			headers: {"content_type":"application/json"}
		})
		.then((res) => res.json())
		.then((data) => {
		setCurrentMessages(JSON.stringify(data, undefined, 4))
		})
	}

	// Delete all messages (probabbly will be a DEV thing)
	function delete_messages() {
		fetch("/clear_messages", {
			method:"DELETE",
			headers: {"content_type":"application/json"}
		})
	}

	return (
		<>
			{/* Main container and section */}
			<Container maxWidth="lg">
				<section className="chat_container">

					{/* Div for displaying chat messages */}
					<div className="chat_messages_container">
						<div className="chat_messages_div">
							<button onClick={delete_messages}> Delete all messages </button>
							<button onClick={show_messages}> Show all messages </button>
							{ currentMessages }
						</div>
					</div>

					{/* Div for chat message input field */}
					<div id="input_field_div">
						<Box width="100%">
							<TextField
								label="Say something :)"
								fullWidth
								multiline
								rows={3} // TODO: Find a way to make this dynamic to div height
								value={messageField}
								onChange={e => setMessageField(e.target.value)}
								variant="outlined"
								color="primary"
								/>
						</Box>
					</div>

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