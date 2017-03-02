var mongoose = require("mongoose");


var newsSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    }
});

var News = mongoose.model("News",newsSchema);

module.exports = News;