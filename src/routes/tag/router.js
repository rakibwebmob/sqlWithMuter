const router =require("express").Router();
const controller=require("./controller")


router.post("/createTag",controller.createTag);
router.get("/findAllTag",controller.findAllTag);
router.get("/findOneTag/:id",controller.findOneTag);
router.post("/addTutorial",controller.addTutorial);
router.put("/updateTag/:id",controller.updateTag);
router.delete("/deleteTag/:id",controller.deleteTag);
router.delete("/deleteAllTag",controller.deleteAllTag);


router.get("/op-like",controller.findLike);
router.get("/op-gt",controller.findGt);
router.get("/op-lt",controller.findlt);
router.get("/op-lte",controller.findlte); 
router.get("/op-gte",controller.findgte); 
router.get("/op-or",controller.findOR); 
router.get("/op-ne",controller.findNe); 
router.get("/op-between",controller.findbetween); 
router.get("/op-notbetween",controller.findnotBetween); 
router.get("/op-In",controller.findIn); 
router.get("/op-notIn",controller.findnotIn); 
router.get("/op-notlike",controller.findnotLike); 
router.get("/op-startsWith",controller.findstartsWith); 
router.get("/op-endsWith",controller.findendsWith); 
router.get("/op-substring",controller.findsubstring); 

module.exports=router;