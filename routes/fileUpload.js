const express = require("express");
const router = express.Router();

const {localFileUpload, imagaUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUploader");

router.post("/localFileUpload", localFileUpload);
router.post("/imagaUpload", imagaUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;