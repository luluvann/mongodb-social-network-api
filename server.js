const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social_network_db",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);


app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
