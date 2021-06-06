const dbConfig = require('../config/db.config')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url

db.user = require("./user.model");
db.role = require("./role.model");
db.News = require("./news.model")(mongoose)
db.todolist = require("./todos.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;