module.exports = app => {
    const todos = require("../controllers/todos.controller");
  
    var router = require("express").Router();
  
    // Create a new Todos
    router.post("/", todos.create);
  
    // Retrieve all Todos
    router.get("/", todos.findAll);
  
    // Retrieve a single Todos with id
    router.get("/:id", todos.findOne);
  
    // Update a Todos with id
    router.put("/:id", todos.update);
  
    // Delete a Todos with id
    router.delete("/:id", todos.delete);
  
    // Delete all Todos
    router.delete("/", todos.deleteAll);
  
    app.use('/api/todos', router);
  };