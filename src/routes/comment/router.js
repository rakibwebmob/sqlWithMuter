const router =require("express").Router();
const controller=require("./controller")


router.post("/createComment",controller.createComment);
router.get("/findallComment",controller.findallComment);
router.get("/findOneCommentById/:id",controller.findOneCommentById);
router.put("/updateComment/:id",controller.updateComment)
router.delete("/deleteCommentById/:id",controller.deleteComment);
router.delete("/deleteAll",controller.deleteAll);

module.exports=router; 