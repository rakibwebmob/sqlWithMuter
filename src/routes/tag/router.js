const router =require("express").Router();
const controller=require("./controller")


router.post("/createTag",controller.createTag);
router.get("/findAllTag",controller.findAllTag);
router.get("/findOneTag/:id",controller.findOneTag);
router.post("/addTutorial",controller.addTutorial);
router.put("/updateTag/:id",controller.updateTag);
router.delete("/deleteTag/:id",controller.deleteTag);
router.delete("/deleteAllTag",controller.deleteAllTag);

module.exports=router;