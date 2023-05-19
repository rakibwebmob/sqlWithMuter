const db = require("../../config/db");
const Comment = db.comment;
const Tutorial = db.tutorial;


const createComment= (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "All filed aare mandatory"
        })
    }
    const comment =
    {
        name: req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId
    };

    Comment.create(comment)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
};

const findallComment = (req, res) => {
   
    Comment.findAll({ include: [{ model: Tutorial, as: "tutorial" }], })
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

const findOneCommentById = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id, { include: [{ model: Tutorial, as: "tutorial" }] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comment with id=" + id
            });
        });
};

const updateComment = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });
};

const deleteComment = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};


const deleteAll = (req, res) => {
    Comment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Comments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all comments."
            });
        });
};

module.exports = {
    createComment,
    findallComment,
    findOneCommentById,
    updateComment,
    deleteComment,
    deleteAll
}