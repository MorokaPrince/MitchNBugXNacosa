const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ dest: "/tmp/uploads" });

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/odk", require("./routes/odk"));

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log("Backend running on port " + PORT));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;