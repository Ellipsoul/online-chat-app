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
  const [inputField, setInputField] = useState("");
  const handleSubmit = () => {
    fetch("/api", {
      method:"POST",
      cache: "no-cache",
      headers: {"content_type":"application/json"},
      body:JSON.stringify({inputField})
      })
    .then(response => { return response.json()})
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
            First Name:
            <input
              type="text"
              value={inputField}
              onChange={e => setInputField(e.target.value)}
            />
            </label>
          <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default App;
