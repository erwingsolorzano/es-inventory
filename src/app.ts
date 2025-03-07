import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventario';

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.set('strictQuery', false); // or true, depending on your needs
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB: ', err));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Bienvenido al sistema de inventario');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
