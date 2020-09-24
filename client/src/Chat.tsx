import React, { useState, SyntheticEvent } from 'react';

export interface chatProps {

}

export default function Chat(props: chatProps) {
	// Send information about input field to backend
	const [messageField, setMessageField] = useState("");
	const handleSubmitMessage = (e:SyntheticEvent) => {
		e.preventDefault() // Prevents page from reloading after submitting message
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
		setCurrentMessages(JSON.stringify(data, null ,4))
		})
	}

	function delete_messages() {
		fetch("/clear_messages", {
			method:"DELETE",
			headers: {"content_type":"application/json"}
		})
	}

	return (
		<>
			<form onSubmit={handleSubmitMessage}>
			<label>
				Type your message here:
				<input
				type="text"
				value={messageField}
				onChange={e => setMessageField(e.target.value)}
				/>
			</label>
			<input type="submit" value="Send Message" />
			</form>

			<button onClick={delete_messages}> Delete all messages </button>

			<button onClick={show_messages}> Show all messages </button>
			<p> { currentMessages } </p>
		</>
	)
}