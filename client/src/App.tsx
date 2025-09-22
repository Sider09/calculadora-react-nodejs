import React, { useState, useEffect } from 'react';
import './App.css';

interface HistoryItem {
  num1: number;
  operacion: string;
  num2: number;
  resultado: number;
  timestamp: string;
}

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/historial');
      if (response.ok) {
        const data: HistoryItem[] = await response.json();
        setHistory(data);
      } else {
        console.error("Error al obtener el historial del servidor.");
      }
    } catch (error) {
      console.error("Error de conexión al obtener el historial:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleButtonClick = (value: string) => {
    if (/[0-9.]/.test(value)) {
      if (operator === '') {
        if (displayValue === '0' && value !== '.') {
          setDisplayValue(value);
        } else {
          setDisplayValue(displayValue + value);
        }
        setFirstNumber(firstNumber + value);
      } else {
        setDisplayValue(displayValue + value);
        setSecondNumber(secondNumber + value);
      }
    } else if (value === 'C') {
      setDisplayValue('0');
      setFirstNumber('');
      setOperator('');
      setSecondNumber('');
    } else if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
      setDisplayValue(displayValue + ' ' + value + ' ');
    } else if (value === '=') {
      calculateResult();
    }
  };

  const calculateResult = async () => {
    if (!firstNumber || !secondNumber || !operator) {
      return;
    }

    const operationMap: { [key: string]: string } = {
      '+': 'sumar',
      '-': 'restar',
      '*': 'multiplicar',
      '/': 'dividir',
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/calcular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: parseFloat(firstNumber),
          num2: parseFloat(secondNumber),
          operacion: operationMap[operator],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDisplayValue(data.resultado.toString());
        setFirstNumber(data.resultado.toString());
        setOperator('');
        setSecondNumber('');
        fetchHistory();
      } else {
        alert(data.error);
        setDisplayValue('Error');
        setFirstNumber('');
        setOperator('');
        setSecondNumber('');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert('Error de conexión con el servidor. Por favor, asegúrate de que el servidor de Node.js está corriendo y escuchando en el puerto 5000.');
      setDisplayValue('Error');
      setFirstNumber('');
      setOperator('');
      setSecondNumber('');
    }
  };

  return (
    <div className="landing-page-container">
      <header className="main-header">
        <h1 className="logo">C.O.M.P.U.T.E.</h1>
        <nav className="nav-menu">
          <a href="#calculator-section">Calculadora</a>
          <a href="#history-section">Historial</a>
          <a href="#contact-section">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Calculadora Cuántica</h1>
            <p className="hero-subtitle">La herramienta definitiva para la precisión del futuro. Cálculos instantáneos, resultados perfectos.</p>
          </div>
        </section>

        <section id="calculator-section" className="section-container">
          <h2 className="section-title">Terminal de Cómputo</h2>
          <p className="section-subtitle">Realiza tus operaciones con la tecnología más avanzada.</p>
          <div className="app-container">
            <div className="calculator">
              <div className="display">{displayValue}</div>
              <div className="buttons">
                <button className="clear" onClick={() => handleButtonClick('C')}>C</button>
                <button className="operator" onClick={() => handleButtonClick('+/-')}>+/-</button>
                <button className="operator" onClick={() => handleButtonClick('%')}>%</button>
                <button className="operator" onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button className="operator" onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button className="operator" onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button className="operator" onClick={() => handleButtonClick('+')}>+</button>
                <button className="zero" onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button className="equals" onClick={() => handleButtonClick('=')}>=</button>
              </div>
            </div>
          </div>
        </section>

        <section id="history-section" className="section-container">
          <h2 className="section-title">Memoria de Operaciones</h2>
          <p className="section-subtitle">Consulta tus cálculos más recientes.</p>
          <div className="app-container">
            <div className="history">
              <h2>Historial</h2>
              <ul>
                {history.length > 0 ? (
                  history.map((op, index) => (
                    <li key={index}>
                      <span>{op.num1} {op.operacion} {op.num2} = {op.resultado}</span>
                      <span className="timestamp">{op.timestamp}</span>
                    </li>
                  ))
                ) : (
                  <p className="empty-history-message">El historial está vacío. ¡Empieza a calcular!</p>
                )}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <p>&copy; 2025 C.O.M.P.U.T.E. | Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>
      </footer>
    </div>
  );
}

export default App;