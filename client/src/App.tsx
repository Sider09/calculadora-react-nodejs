import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Proyecto React y Node.js</h1>
        <p>Mensaje del backend:</p>
        <p className="message">{message || 'Cargando...'}</p>
      </header>
    </div>
  );
}

export default App;