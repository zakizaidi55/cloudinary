const express = require("express");
const router = express.Router();

const {localFileUpload, imagaUpload} = require("../controllers/fileUploader");

router.post("/localFileUpload", localFileUpload);
router.post("/imagaUpload", imagaUpload);

module.exports = router;