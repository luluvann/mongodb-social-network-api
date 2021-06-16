const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost/social_network_db", {
  useFindAndModify: false, 
  useNewUrlParsertrue,
  useUnifiedTopology:true})

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
})
