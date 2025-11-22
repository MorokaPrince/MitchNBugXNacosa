const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ dest: "/tmp/uploads" });

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/odk", require("./routes/odk"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Backend running on port " + PORT));

module.exports = app;