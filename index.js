const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Server/Models/Todo');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true }) // Update the document
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});
app.delete('/delete/:id',(req, res) => {
  const {id}=req.params;
  TodoModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result)) 
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3000, () => {
  console.log("Server is Running successfully");
});
