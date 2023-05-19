const Sequelize =require("sequelize");

const sequelize=new Sequelize('sqlmulter','root','123456',{
    host:"localhost",
    dialect:"mysql"
});

sequelize
.authenticate()
.then(()=>{
    console.log("connection has been estabished successfully");
})
.catch((error)=>{
    console.error("unable to connect to the database",error)
});

const  db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.tutorial=require("../routes/tutorial/model")(sequelize,Sequelize);
db.tag=require("../routes/tag/model")(sequelize,Sequelize);
db.comment=require("../routes/comment/model")(sequelize,Sequelize);

// one to many between comment and tutorial
db.tutorial.hasMany(db.comment, { as: "comment" });
db.comment.belongsTo(db.tutorial, {
  foreignKey: "tutorialId",
  as: "tutorial",
});


// many to many between tutorial and tag
db.tag.belongsToMany(db.tutorial, {
  through: "tutorial_tag",
  as: "tutorial",
  foreignKey: "tag_id",
});
db.tutorial.belongsToMany(db.tag, {
  through: "tutorial_tag",
  as: "tag",
  foreignKey: "tutorial_id",
});

// db.comment.belongsToMany(db.tag, {
//   through: "tutorial_tag",
//   as: "tag",
//   foreignKey: "tutorial_id",
// });
sequelize.sync({force:false})
.then(()=>{
    console.log("yes re-sync done");
});

module.exports=db;