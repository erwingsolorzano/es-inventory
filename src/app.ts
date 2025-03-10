import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventory';

// Set the strictQuery option based on your needs
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB: ', err));

// Middleware for parsing JSON
app.use(express.json());

// Product routes
app.use('/products', productRoutes);

// Authentication routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the inventory system');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
