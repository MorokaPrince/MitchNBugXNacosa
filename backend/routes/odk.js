const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads" });
const xml2js = require("xml2js");
const fs = require("fs");

router.post("/submissions", upload.any(), async (req, res) => {
  try {
    const xmlFile = req.files?.find((f) => f.fieldname === "xml_submission_file");
    let parsed = null;

    if (xmlFile) {
      const xml = fs.readFileSync(xmlFile.path, "utf8");
      parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    } else {
      parsed = req.body;
    }

    console.log("Received ODK submission", parsed);

    res.status(201).json({ status: "ok", data: parsed });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ status: "error" });
  }
});

module.exports = router;