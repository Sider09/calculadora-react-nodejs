const express = require('express');
const cors = require('cors');

// Inicializa la aplicación de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para habilitar CORS y procesar JSON
app.use(cors());
app.use(express.json());

// Ruta principal para la API de la calculadora
app.post('/api/calcular', (req, res) => {
  // Extrae los datos del cuerpo de la solicitud (body)
  const { num1, num2, operacion } = req.body;

  // Valida que los datos sean números
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Los valores deben ser números válidos.' });
  }

  // Variable para almacenar el resultado
  let resultado;

  // Realiza la operación según el valor de 'operacion'
  switch (operacion) {
    case 'sumar':
      resultado = num1 + num2;
      break;
    case 'restar':
      resultado = num1 - num2;
      break;
    case 'multiplicar':
      resultado = num1 * num2;
      break;
    case 'dividir':
      if (num2 === 0) {
        return res.status(400).json({ error: 'No se puede dividir por cero.' });
      }
      resultado = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Operación no válida. Use: sumar, restar, multiplicar o dividir.' });
  }

  // Envía la respuesta con el resultado
  res.json({ resultado });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor de la calculadora escuchando en http://localhost:${PORT}`);
});