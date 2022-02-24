const controller = require("../../controller/image")
const router = require("express").Router()


router.get("/", controller.getImages)                          // get all images
router.post("/", controller.addImage)                         // add image to database
router.get("/:imageId", controller.getImage)                 // get a single image
router.patch("/:imageId", controller.updateImage)           // update image
router.delete("/:imageId", controller.deleteImage)           // delete image


module.exports = router