const mongoose = require("mongoose");
const schema = mongoose.Schema(
      {
        todo: String,
        user_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]
      },
      { timestamps: true }
);
schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
});
  
const Todos = mongoose.model("Todos", schema);
module.exports = Todos

  