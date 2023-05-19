const db = require("../../config/db.js");
const tutorial = db.tutorial;
const comment =db.comment
const tag =db.tag
const Op=db.Sequelize.Op
const multer = require('multer')
const path = require('path')


const createTutorial = async (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "contain can not be empty" })
        return
    }

    const tutorials= {
        title: req.body.title,
        image: req.file.path,
        description: req.body.description,
        published: req.body.published 
    };

    tutorial.create(tutorials)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


const getTutorial =  (req, res) => {

  
    tutorial.findAll({  
        
        include: [
          {
            model: tag,
            as: "tag",
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
            
          },
        ],
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  


const findOneTutorialById =  (req, res) => {
    const id = req.params.id;
  
    tutorial.findByPk(id, 
      { 
        include: [
        {
          model: tag,
          as: "tag",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: comment, 
          as: "comment"
        }
      ] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

const updateTutorial = (req, res) => {
    const id = req.params.id;
  
    tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

const deleteTutorial = (req, res) => {
    const id = req.params.id;

    tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};


const deleteAllTutorial = (req, res) => {
    tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};


const findAllPublishedTutorial = (req, res) => {
    tutorial.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };



module.exports = {
    createTutorial,
    upload,
    getTutorial,
    findOneTutorialById,
    updateTutorial,
    deleteTutorial,
    deleteAllTutorial,
    findAllPublishedTutorial

}