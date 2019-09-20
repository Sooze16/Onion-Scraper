var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  body: {
    type: String
  }
});

var Note = mongoose.model("note", NoteSchema);

module.exports = Note;