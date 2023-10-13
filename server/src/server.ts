import express from 'express';
import { getUser } from './controllers/UserController';
import { validateEmail, validatePhoneNumber } from './utils/validate';

let currentTimeout: NodeJS.Timeout | null = null;

const app = express();
const PORT = 5050;

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

  //   if (!validateEmail(email) || !validatePhoneNumber(number)) {
  //     return res.status(400).json({ error: 'Phone Number or Email not valid' });
  //   }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  currentTimeout = setTimeout(async () => {
    const results = await getUser(email, number);

    if (!results || results.length === 0) {
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
