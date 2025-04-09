const express = require('express');
const winston = require('winston');

const app = express();
app.use(express.json());

// Create the logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// Middleware to log each request
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Addition Route
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) + parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for addition: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Addition operation: ${num1} + ${num2} = ${result}`);
  res.json({ result });
});

// Subtraction Route
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) - parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for subtraction: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Subtraction operation: ${num1} - ${num2} = ${result}`);
  res.json({ result });
});

// Multiplication Route
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) * parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for multiplication: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Multiplication operation: ${num1} * ${num2} = ${result}`);
  res.json({ result });
});

// Division Route
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (parseFloat(num2) === 0) {
    logger.error(`Error: Division by zero attempt: ${num1} / ${num2}`);
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }
  const result = parseFloat(num1) / parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for division: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Division operation: ${num1} / ${num2} = ${result}`);
  res.json({ result });
});

// Exponentiation Route
app.get('/exponentiate', (req, res) => {
  const { num1, num2 } = req.query;
  const result = Math.pow(parseFloat(num1), parseFloat(num2));
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for exponentiation: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Exponentiation operation: ${num1} ^ ${num2} = ${result}`);
  res.json({ result });
});

// Square Root Route
app.get('/sqrt', (req, res) => {
  const { num1 } = req.query;
  if (parseFloat(num1) < 0) {
    logger.error(`Error: Negative input for square root: ${num1}`);
    return res.status(400).json({ error: 'Cannot compute the square root of a negative number' });
  }
  const result = Math.sqrt(parseFloat(num1));
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for square root: ${num1}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Square Root operation: √${num1} = ${result}`);
  res.json({ result });
});

// Modulo Route
app.get('/modulo', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) % parseFloat(num2);
  if (isNaN(result)) {
    logger.error(`Error: Invalid input for modulo: ${num1}, ${num2}`);
    return res.status(400).json({ error: 'Invalid input' });
  }
  logger.info(`Modulo operation: ${num1} % ${num2} = ${result}`);
  res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});