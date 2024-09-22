const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('User Address Backend API');
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
