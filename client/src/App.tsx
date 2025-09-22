// client/src/App.tsx
import React from 'react';
import './App.css'; // Importamos nuestros estilos CSS

function App() {
  // Aquí es donde irá la lógica para manejar el estado de la calculadora
  // Por ahora, solo nos enfocaremos en la parte visual.
  const displayValue = "0"; // Valor inicial que se mostrará en la pantalla

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        {/* Fila 1 */}
        <button className="clear">C</button>
        <button className="operator">+/-</button> {/* Podríamos añadir esta funcionalidad después */}
        <button className="operator">%</button>
        <button className="operator">/</button>

        {/* Fila 2 */}
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="operator">*</button>

        {/* Fila 3 */}
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className="operator">-</button>

        {/* Fila 4 */}
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className="operator">+</button>

        {/* Fila 5 */}
        <button className="zero">0</button>
        <button>.</button>
        <button className="equals">=</button>
      </div>
    </div>
  );
}

export default App;