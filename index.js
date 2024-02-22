const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const productRoutes = require('./routes/productRoutes');
const User = require('./models/User'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Usuarios
const users = [
  new User('admin', '1234'),
  new User('cesar', '1234'),
  new User('Emmanuel', '1234')
];

// Rutas públicas
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar credenciales
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  // Generar token JWT
  const token = jwt.sign({ username: user.username }, 'secret_key');
  res.json({ token });
});
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Crear nuevo usuario
  const newUser = new User(username, password);
  users.push(newUser);

  // Generar token JWT para el nuevo usuario
  const token = jwt.sign({ username: newUser.username }, 'secret_key');
  res.status(201).json({ token });
});

// Rutas protegidas a partir de esta línea.
app.use((req, res, next) => {
  authMiddleware(req, res, next, users); // Pasar users al middleware
});

// Rutas de productos
app.use('/products', productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
