const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(`Connected to MongoDB: ${process.env.MONGO_URI}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send('Home page stub'));

app.use('/books', require('./controllers/book_controller.js'));

app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));