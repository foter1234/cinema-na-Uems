const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Permita o porta específica
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = 'your-secret-key';

app.post('/generate-token', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send('sem nome de usuario');
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('auth_token', token, {
    httpOnly: true, // Impede o acesso ao cookie pelo JavaScript do lado do cliente
    secure: false, // Defina como true se estiver usando HTTPS
    maxAge: 3600000 // 1 hora
  });
  res.json({ message: 'token gerado' }); // Responda com uma mensagem de sucesso
});

app.get('/verify-token', (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).send('token não gerado');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('token invalido');
    }
    res.status(200).send('token valido');
  });
});

app.listen(port, () => {
  console.log(`servidor rodando na porta:${port}`);
});
