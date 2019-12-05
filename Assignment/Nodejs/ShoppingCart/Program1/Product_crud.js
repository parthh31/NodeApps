var mongoose=require('mongoose');
var express = require('express');
var Category=require('./category_schema');
var bodyParser = require('body-parser');
var path=require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');



//connection with database
mongoose.connect('mongodb://localhost:27017/product_db',{useNewUrlParser :true});
var db=mongoose.connection;
mongoose.set('useFindAndModify',false);
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

//create schema
var ProductSchema = new mongoose.Schema({
    ProductName: {
        type:String,
        unique:true,
        required:true,
    
    },
    ProductPrice: {
        type:Number,
        unique:true,
        required:true,
    
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    } 
  });
  
  var Product= mongoose.model("Product", ProductSchema ,"Products");
//add product
app.get('/AddProduct',function(req,res)
{
    Category.find(function(err,Categories)
    {
        if(err)
        {
            return err;
        }
        else{
            res.render('AddProduct.ejs',{cats:Categories});
        }
    });
    
});

// Insert Data
app.post('/AddProduct', (req, res) => {
    var ProductData = new Product({
         ProductName:req.body.productname,
         ProductPrice:req.body.productprice,
         Category:req.body.catcombo
         });
   console.log(ProductData);
     ProductData.save()
       .then(item => {
         res.send("item saved to database");
       })
       .catch(err => {
         res.status(400).send("unable to save to database");
       });
   
   });
   // END INSERT Data
   
   app.get('/selectcategory',function(req,res)
   {
    var category;
    var product;
    Category.find(function(err,Categories)
    {
        category=Categories;
    Product.find(function(err,Products)
    {
        product=Products;
    });
        res.render('selectcategory.ejs',{cats:category,prod:product});
   
    });
    
    
   });

//display product select category
app.post('/SelectCategory',function(req,res)
{
	var catname=req.body.catcombo;
	if(username && password)
	{
		Admin.find({userName:username,Password:password},(err,res)=>{
            if(res.length>0)
				{
					req.session.loggedin=true;
					req.session.username=username;		
					response.redirect('/home');
				}
				else
				{
					response.redirect('/login.html');
            	}
           
        });
    }
   
});

app.get('/home',function(req,res)
{
    res.sendFile(path.resolve(__dirname, 'view', 'home.html'));
});
app.get('/logout',function(req,res)
{
	if(req.session.loggedin)
	{
		req.session.destroy(
			function(err)
			{
				if(err)
				{
					return next(err);
				}
				else
				{					
					console.log('u r logout');
					return res.redirect('/login.html');
				}
			}
		);
	}
});
app.listen(8001);
