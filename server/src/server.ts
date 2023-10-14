import express from 'express';
import { getUser } from './controllers/UserController';
import { validateEmail } from './utils/validate';

let currentTimeout: NodeJS.Timeout | null = null;

const app = express();
const PORT = 5050;
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3173',
];

app.use((req, res, next) => {
  const origin = req.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  res.header('Access-Control-Allow-Methods', 'GET');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello from the TypeScript Express server!');
});

app.get('/users', async (req, res) => {
  const { email, number } = req.query as { email: string; number: string };

  if (!email && !number) {
    return res
      .status(400)
      .json({ error: 'Please provide an email, a number, or both.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email not valid' });
  }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  currentTimeout = setTimeout(async () => {
    const results = await getUser(email, number);

    if (!results) {
      return res
        .status(204)
        .json({ error: 'No users found with the provided criteria.' });
    }

    res.json(results);
    currentTimeout = null;
  }, 3000);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
