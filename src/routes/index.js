var express =require("express");
const routes =express();

const tutorial =require("./tutorial");
routes.use("/tutorial",tutorial.router)

const tag =require("./tag");
routes.use("/tag",tag.router)

const comment =require("./comment");
routes.use("/comment",comment.router)

module.exports={
    module:{
        tutorial,
        tag,
        comment
    },
    routes
};