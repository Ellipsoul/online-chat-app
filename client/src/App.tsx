import React, {useState, useEffect, SyntheticEvent} from 'react';
import './App.css';

function App() {
  console.log('Frontend is now running!');
  const logo = require("./logo.svg") as string;

  // Receiving backend current time from backend
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('/time').then((res) => res.json()).then((data) => {
      setCurrentTime(data.time);
    });
  }, []);

  // Sets the user's name
  const [name, setName] = useState("Anonymous");
  const handleSubmitName = (e:SyntheticEvent) => {
    e.preventDefault()
    console.log("Name changed!")
  }

  // Send information about input field to backend
  const [messageField, setMessageField] = useState("");
  const handleSubmitMessage = (e:SyntheticEvent) => {
    e.preventDefault() // Prevents page from reloading after submitting message
    console.log("Message sent!")
    var d = new Date(Date.now());
    fetch("/send_message", {
      method:"POST",
      headers: {"content_type":"application/json"},
      body:JSON.stringify(
        { 
          "name": name,
          "date": d.toString(),
          "message": messageField,
        })
      })
    .then(response => { return response.json()})
    return false
  }

  // Retrieve all current messages from the server
  const [currentMessages, setCurrentMessages] = useState("");
  function show_messages() {
    fetch("/get_messages")
    .then((res) => res.json())
    .then((data) => {
      setCurrentMessages(JSON.stringify(data, null ,4))
    })
  }

  return (
    <div className="App">
      <header className="App-header">

        <p> The current time is { currentTime } </p>

        <form onSubmit={handleSubmitName}>
          <label> 
            Type your name here:
            <input 
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit Name" />
        </form>


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

        <button onClick={show_messages}> Show all messages </button>
        <p> { currentMessages } </p>

      </header>
    </div>
  );
}

export default App;
