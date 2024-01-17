const model = require("../models/file");
const cloudinary = require("cloudinary").v2;
const File = require("../models/file");
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

function isFileTypeSupported (type, supportedType) {
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};

    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload

exports.imagaUpload = async(req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File format ", fileType);
        
        if(!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success:false,
                message:'File format is not suppported',
            })
        }

        console.log("Uploading to the cloud ");
        const response = await uploadFileToCloudinary(file, "zakiData");
        console.log("Response", response);

        // db m entry
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        })
        
        res.status(201).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })


    } catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong ',
        })
    }
};

exports.videoUpload = async(req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.File.videoFile;

        // validation
        const supportedType = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        if(!isFileTypeSupported(fileType, supportedType)) {
            return re.status(400).json({
                success:false,
                message:"Format type not supported",
            })
        }


        console.log("Uploading to the cloud ");
        const response = await uploadFileToCloudinary(file, "zakiData");
        console.log("Response", response);

        const fileData = await File.create({
            name,
            tags, 
            email,
            videoUrl: response.secure_url,
        })
        
        res.status(201).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully",
        })

    } catch(err) {
        console.error(err)
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
};

exports.imageSizeReducer =async (req, res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File format ", fileType);
        
        if(!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success:false,
                message:'File format is not suppported',
            })
        }

        console.log("Uploading to the cloud ");
        const response = await uploadFileToCloudinary(file, "zakiData", 30);
        console.log("Response", response);

        // db m entry
        const fileData = await File.create({
            name,
            tags, 
            email,
            imageUrl: response.secure_url,
        })
        
        res.status(201).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })


    } catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong ',
        })
    }
}