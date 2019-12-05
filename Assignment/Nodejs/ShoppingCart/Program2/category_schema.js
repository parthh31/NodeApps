var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/product_db", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//create schema
var CategorySchema = new mongoose.Schema({
    cat_name: {
        type:String,
        unique:true,
        required:true,
    
    }
    
  });
  
  var Category = mongoose.model("Category", CategorySchema,"Category");
module.exports=Category;