import React, { useState } from 'react';
import './App.css'; // Importamos nuestros estilos CSS

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [secondNumber, setSecondNumber] = useState('');

  const handleButtonClick = (value: string) => {
    // Maneja los botones de números y punto decimal
    if (/[0-9.]/.test(value)) {
      if (operator === '') {
        // Ingresando el primer número
        if (displayValue === '0' && value !== '.') {
          setDisplayValue(value);
        } else {
          setDisplayValue(displayValue + value);
        }
        setFirstNumber(firstNumber + value);
      } else {
        // Ingresando el segundo número
        setDisplayValue(displayValue + value);
        setSecondNumber(secondNumber + value);
      }
    } else if (value === 'C') {
      // Botón "Clear"
      setDisplayValue('0');
      setFirstNumber('');
      setOperator('');
      setSecondNumber('');
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Es un operador
      setOperator(value);
      setDisplayValue(displayValue + ' ' + value + ' ');
    } else if (value === '=') {
      // Botón "Igual"
      calculateResult();
    }
  };

  const calculateResult = async () => {
    // Si no tenemos todos los componentes, no hacemos nada
    if (!firstNumber || !secondNumber || !operator) {
      return;
    }

    // Mapea los símbolos a los nombres que el backend espera
    const operationMap: { [key: string]: string } = {
      '+': 'sumar',
      '-': 'restar',
      '*': 'multiplicar',
      '/': 'dividir',
    };
    
    // Envía los datos al servidor para calcular el resultado
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
        // Si la respuesta es exitosa, muestra el resultado
        setDisplayValue(data.resultado.toString());
        // Reinicia el estado para la próxima operación
        setFirstNumber(data.resultado.toString());
        setOperator('');
        setSecondNumber('');
      } else {
        // Maneja los errores del servidor
        alert(data.error);
        setDisplayValue('Error');
        setFirstNumber('');
        setOperator('');
        setSecondNumber('');
      }
    } catch (error) {
      // Maneja errores de conexión
      console.error("Error de conexión:", error); // Imprimimos el error en la consola
      alert('Error de conexión con el servidor. Revisa la consola para más detalles.');
      setDisplayValue('Error');
      setFirstNumber('');
      setOperator('');
      setSecondNumber('');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        {/* Fila 1 */}
        <button className="clear" onClick={() => handleButtonClick('C')}>C</button>
        <button className="operator" onClick={() => handleButtonClick('+/-')}>+/-</button>
        <button className="operator" onClick={() => handleButtonClick('%')}>%</button>
        <button className="operator" onClick={() => handleButtonClick('/')}>/</button>

        {/* Fila 2 */}
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button className="operator" onClick={() => handleButtonClick('*')}>*</button>

        {/* Fila 3 */}
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button className="operator" onClick={() => handleButtonClick('-')}>-</button>

        {/* Fila 4 */}
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button className="operator" onClick={() => handleButtonClick('+')}>+</button>

        {/* Fila 5 */}
        <button className="zero" onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button className="equals" onClick={() => handleButtonClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
