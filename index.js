// app create 
const express = require("express");
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

// db connect
const db = require("./config/database");
db.connect();

// cloudinary connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount karna h
const Upload = require("./routes/fileUpload");
app.use('/api/v1/upload', Upload);

// activate server
app.listen(PORT, () => {
    console.log(`APP is running at ${PORT}`);
})


