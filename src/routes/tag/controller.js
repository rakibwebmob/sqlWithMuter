const db = require("../../config/db");
const Tag = db.tag;
const Tutorial = db.tutorial;


const createTag = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Tag can not be empty!"
    });
    return;
  }

  // Create a tag
  const tag = {
    name: req.body.name
  };

  // Save tag in the database
  Tag.create(tag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag."
      });
    });
};

// Retrieve all Tags from the database.
const findAllTag = (req, res) => {

  Tag.findAll({
    include: [
      {
        model: Tutorial,
        as: "tutorial",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tags."
      });
    });
};

// Find a single Tag with an id
const findOneTag = (req, res) => {
  const id = req.params.id;

  Tag.findByPk(id, { include: [{ model: Tutorial, as: "tutorial" }] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id
      });
    });
};

const addTutorial = (req, res) => {
  const { tagId, tutorialId } = req.body;
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        res.status(400).send({
          message: "Tag can not be empty!"
        });
        return;
      }
      console.log("tag : ", tag)
      return Tutorial.findByPk(tutorialId).then((tutorial) => {
        if (!tutorial) {
          res.status(400).send({
            message: "Tutorial can not be empty!"
          });
          return;
        }

        tag.addTutorial(tutorial);
        console.log(` added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        res.send(tag);
      });
    })
    .catch((err) => {
      console.log(" Error while adding Tutorial to Tag: ", err);
    });
};

// Update a Tag by the id in the request
const updateTag = (req, res) => {
  const id = req.params.id;

  Tag.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tag was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tag with id=" + id
      });
    });
};

// Delete a Tag with the specified id in the request
const deleteTag = (req, res) => {
  const id = req.params.id;

  Tag.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id
      });
    });
};

// Delete all Tags from the database.
const deleteAllTag = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tags were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tags."
      });
    });
};


const Op = db.Sequelize.Op;


//! operator5

// op.like

const findLike = (req, res) => Tag.findAll({
  where: {
    name: {
      [Op.like]: "%rakib",
    },
  },
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});
const findnotLike= (req, res) => Tag.findAll({
  where: {
    name: {
      [Op.notLike]: "%rakib",
    },
  },
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});


const findGt= async (req, res) => await Tag.findAll({
  where: {
    id: {
      [Op.gt]: 1
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});


const findgte= async (req, res) => await Tag.findAll({
  where: {
    id: {
      [Op.gte]: 5
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

const findlt= async (req, res) => await Tag.findAll({
  where: {
    id: {
      [Op.lt]: 5
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

const findlte= async (req, res) => await Tag.findAll({
  where: {
    id: {
      [Op.lte]: 5
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});



const findOR=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.or]: [5, 6]
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});


const findNe=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.or]: [5]
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});



const findbetween=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.between]: [3, 7],
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});


const findnotBetween=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.notBetween]: [3, 7],
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});


const findIn=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.in]: [3, 7],
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

const findnotIn=(req, res)=>Tag.findAll({
  where: {
    id: {
      [Op.notIn]: [3, 7],
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});
const findstartsWith=(req, res)=>Tag.findAll({
  where: {
    name: {
      [Op.startsWith]: "ra%",
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

const findendsWith=(req, res)=>Tag.findAll({
  where: {
    name: {
      [Op.endsWith]: "pak%",
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

const findsubstring=(req, res)=>Tag.findAll({
  where: {
    name: {
      [Op.substring]: "rakib",
    }
  }
})
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message: "Error retrieving Tag with id=" + id
  });
});

module.exports = {
  createTag,
  findAllTag,
  findOneTag,
  addTutorial,
  updateTag,
  deleteTag,
  deleteAllTag,
 
//  oprator
 
  findLike,
  findGt,
  findlt,
  findlte,
  findgte,
  findOR,
  findNe,
  findbetween,
  findnotBetween,
  findIn,
  findnotIn,
  findnotLike,
  findstartsWith,
  findendsWith,
  findsubstring
}