const db = require("../models");
const Todolist = db.todolist;

// Create and Save a new Todo
exports.create = (req, res) => {
      // Validate request
  if (!req.body.todo || !req.body.user_id) {
    res.status(400).send({ message: "todo or user_id cannot be empty" });
    return;
  }

  // Create a Tutorial
  const todo = new Todolist({
    todo: req.body.todo,
    user_id: req.body.user_id
  })
  console.log(todo)

  // Save Todo in the database
  Todolist.create(todo).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todo."
      });
    });
  
};

// Retrieve all Todo from the database.
exports.findAll = (req, res) => {

  const title = req.query.todo;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Todolist.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Todos."
      });
    });
  
};

// Find a single Todo with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Todolist.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Todo with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Todo with id=" + id });
      });
  
};

// Update a Todo by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Todolist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
            });
          } else res.send({ message: "Todo was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Todo with id=" + id
          });
        });
  
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Todolist.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
          });
        } else {
          res.send({
            message: "Todo was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todo with id=" + id
        });
      });
  
};

// Delete all Todo from the database.
exports.deleteAll = (req, res) => {

    Todolist.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });

  
};