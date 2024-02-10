import React, { useState, useEffect } from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      
    </div>
  );
}

export default App