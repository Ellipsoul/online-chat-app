import React, {useState, useEffect} from 'react';
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

  // Send information about input field to backend
  const [messageField, setMessageField] = useState("");
  const handleSubmit = () => {
    var d = new Date(Date.now());
    fetch("/send_message", {
      method:"POST",
      headers: {"content_type":"application/json"},
      body:JSON.stringify(
        { "message": messageField,
          "date": d.toString()
        })
      })
    .then(response => { return response.json()})
  } 

  function show_messages() {
    fetch("/get_messages")
    .then((res) => res.json())
    .then((data) => {console.log(data)})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p> The current time is { currentTime } </p>

        <form onSubmit={handleSubmit}>
          <label>
            Type your message here:
            <input
              type="text"
              value={messageField}
              onChange={e => setMessageField(e.target.value)}
            />
            </label>
          <input type="submit" value="Submit" />
        </form>

        <button onClick={show_messages}> Show all messages </button>

      </header>
    </div>
  );
}

export default App;
