const Image = require("../models/Image")
const asyncWrapper = require("../middleware/async-wrapper")
const {BadRequestError} = require("../errors/index")

const addImage = asyncWrapper(async (req, res, next) => {

    const file = req.body.file
    if(!file) throw new BadRequestError("Image is required")

    const image = new Image({
        data: file.data,
        extension: file.extension,
        ownerId: req.user._id,
    })

    // create and save image
    await image.save()

    res.json({success: true, message: "Image successfully added to the database"})

})

const deleteImage = asyncWrapper(async (req, res, next) => {

    const {imageId} = req.params
    
    const image = await Image.findById(imageId)
    await image.deleteOne()
    res.json({success: true, message: "Image successfully deleted"})
})

const getImages = asyncWrapper(async (req, res, next) => {

    
    const images = await Image.find()
    res.json({images}).status(200)

})

const getImage = asyncWrapper(async (req, res, next) => {

    const {imageId} = req.params
    
    const image = await Image.findById(imageId)
    if(!image){
        throw new BadRequestError("Image not found")
    }

    res.json({
        success: true,
        image
    })

})


const updateImage = asyncWrapper(async (req, res, next) => {

    if(!req.query.vote) return BadRequestError("Cannot update image")
    
    
    const vote = req.query.vote

    const votes = ["like", "dislike"]
    const {imageId} = req.params

    let image = await Image.findById(imageId)

    if(vote && votes.includes(vote)){
        image[vote] = req.user._id
    }

    await image.save()
    res.json({success: true, message: "successfully updated"})


})





module.exports = {
    deleteImage,
    addImage,
    getImages,
    updateImage,
    getImage
}