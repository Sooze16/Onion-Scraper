var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    link: {
        type: String,
        unique: true
    },
    pic: {
        type: String
    },
    savedNews: {
        type: Boolean,
        default:false
    },
    summary:{
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;