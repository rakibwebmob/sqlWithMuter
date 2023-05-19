const router =require("express").Router();
const controller=require("./controller")

router.post("/addtutorial",controller.upload,controller.createTutorial);

router.get("/getTutorial",controller.getTutorial);

router.get("/findOneTutorialById/:id",controller.findOneTutorialById);

router.put("/updateTutorial/:id",controller.upload,controller.updateTutorial);

router.delete("/deleteTutorial/:id",controller.deleteTutorial);

router.delete("/deleteAllTutorial",controller.deleteAllTutorial);

router.get("/findAllPublishedTutorial",controller.findAllPublishedTutorial)

module.exports=router;