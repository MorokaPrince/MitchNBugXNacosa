const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads" });
const xml2js = require("xml2js");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

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

router.get('/formList', (req, res) => {
  const formsDir = path.join(__dirname, '../public/forms');
  try {
    const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.xml'));
    const forms = files.map(f => {
      const filePath = path.join(formsDir, f);
      const xml = fs.readFileSync(filePath, 'utf8');
      const titleMatch = xml.match(/<title>(.*?)<\/title>/);
      const name = titleMatch ? titleMatch[1] : f.replace('.xml', '');
      const idMatch = xml.match(/id="([^"]*)"/);
      const formId = idMatch ? idMatch[1] : f.replace('.xml', '');
      const versionMatch = xml.match(/version="([^"]*)"/);
      const version = versionMatch ? versionMatch[1] : '1';
      const hash = crypto.createHash('md5').update(xml).digest('hex');
      return { formId, name, version, hash };
    });
    let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?>\n<xforms xmlns="http://openrosa.org/xforms/xformsList">\n';
    forms.forEach(form => {
      xmlResponse += `  <xform>\n    <formID>${form.formId}</formID>\n    <name>${form.name}</name>\n    <version>${form.version}</version>\n    <hash>md5:${form.hash}</hash>\n    <downloadUrl>http://localhost:5001/forms/${form.formId}/form.xml</downloadUrl>\n    <manifestUrl>http://localhost:5001/forms/${form.formId}/manifest</manifestUrl>\n  </xform>\n`;
    });
    xmlResponse += '</xforms>';
    res.set('Content-Type', 'text/xml');
    res.send(xmlResponse);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error generating form list');
  }
});

router.get('/forms/:formId/form.xml', (req, res) => {
  const formId = req.params.formId;
  const formsDir = path.join(__dirname, '../public/forms');
  // Assume filename is formId + .xml, but replace _ with - if needed
  let filename = `${formId}.xml`;
  if (!fs.existsSync(path.join(formsDir, filename))) {
    filename = `${formId.replace(/_/g, '-')}.xml`;
  }
  const filePath = path.join(formsDir, filename);
  if (fs.existsSync(filePath)) {
    res.set('Content-Type', 'text/xml');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Form not found');
  }
});

module.exports = router;