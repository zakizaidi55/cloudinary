const model = require("../models/file");

// handler function

exports.localFileUpload = async (req, res) => {
    try {
        // fetch the file
        const file = req.files.file;
        console.log("File", file);
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path);
        file.mv(path, (error) => {
            console.log(error);
        });

        res.status(200).json({
            success:true,
            message:"Local file uploaded successfullt"
        })

    } catch (error) {
        console.log(error);
    }
}