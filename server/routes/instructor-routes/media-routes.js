const express = require('express');
const multer = require('multer');
const {uploadMediaToCloudinary, deleteMediaFromCloudinary} = require("../../helpers/cloudinary");

const router = express.Router();

const upload = multer({dest: 'uploads/'});

router.post('/upload', upload.single('file'), async(req,res) => {
    console.log('so call here')
    try{
        const result = await uploadMediaToCloudinary(req.file.path);
        res.status(200).json({success: true, data: result});
    }
    catch(e)
    {
        console.log(e);
        res.status(500).json({success: true, message: 'Error uploading files'})
    }
});
router.delete('/delete/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "id is required"})
        }
        await deleteMediaFromCloudinary(id);
        res.status(200).json({success: true, message: "Accest successfully from cloudinary"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({success: true, message: 'Error deleting files'})
    }
})
module.exports = router;