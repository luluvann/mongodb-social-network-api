const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost/social_network_db", {
  useFindAndModify: false, 
  useNewUrlParser:true,
  useUnifiedTopology:true});

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

//READ (FIND) REQUESTS
app.get('/api/users', (req, res) => {
  User.find({}).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
})
app.get('/api/users/:userid', (req, res) => {
  User.findById(req.params.userid).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
})
//POST CREATE REQUESTS
app.post('/api/users', (req, res) => {
  User.create(req.body).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
})
//UPDATE PUT REQUESTS
app.put('/api/users/:userid', (req, res) => {
  User.findByIdAndUpdate(req.params.userid, req.body, { new: true }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
})
//DELETE DELETE REQUESTS
app.delete('/api/users/:userid', (req, res) => {
  User.findOneAndDelete({ _id: req.params.userid }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json(err);
  })
})

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
