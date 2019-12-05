var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var path=require('path');
var app=express();
app.set('view enginee','ejs');
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/exam_db',{useNewUrlParser:true});
var db=mongoose.connection;
db.once('open',function(callback)
{
    console.log('connection successful');
});

var Categoryschema=mongoose.Schema({
    catname:
    {
        type:String,
        required:true,
        unique:true
    }
});
var Category=mongoose.model('Category',Categoryschema,'Categories');

var productschema=mongoose.Schema(
    {
        productname:
        {
            type:String,
            required:true,
        },
        productprice:
        {
            type:Number,
            required:true,
        },
       
        category:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Category
        }
    }
);
var Product=mongoose.model('Product',productschema,'Products');
app.get('/addcategory',function(req,res)
{
        res.render("category.ejs");
});

app.post('/addcategory',function(req,res)
{
    var catname=req.body.catname;
    var Categorydata=new Category({
        catname:catname
    });

    Categorydata.save().then(item=>
        {
        res.send('item save');}
        ).catch(err=>{res.send('unable to save db')});
});

app.get('/showcategory',function(req,res)
{
        Category.find(function(err,Categories)
        {
            var category=Categories;
            Product.find(function(err,products)
            {
var product=products;

res.render("category_show.ejs",{data:category,prod:product});
            });
        });
        
});

app.get('/addproduct',function(req,res)
{
    Category.find(function(err,Categories)
    {
        var cat=Categories;
        res.render("product.ejs",{data:cat});
    });
});

app.post('/addproduct',function(req,res)
{
    var proname=req.body.proname;
    var proprice=req.body.proprice;
    var catid=req.body.category_cmb;
    var proddata=new Product({
        productname:proname,
        productprice:proprice,
        category:catid
    });
    console.log(proddata);
    proddata.save().then(
        item=>
        {
            console.log('item saved to database');
        }
    ).catch(err=>
        {
            console.log('unable to save database');
        });
});

app.get('/showproduct',function(req,res)
{
    Product.find(function(errr,Products)
    {
        res.send(Products);
    });
});
app.get('/deleteproduct/:id',function(req,res)
{
    Product.findOneAndRemove(req.params.id,function(err,Products)
    {
        console.log(Products);
    });
});


app.get('/updateproduct/:id',function(req,res)
{
    Category.find(function(err,Categories)
    {
        var category=Categories;
        Product.findById(req.params.id,function(err,products)
        {
var product=products;

res.render("updateprod.ejs",{data:category,prod:product});
        });
    });
});
app.post('/updateproduct',function(req,res)
{
    var proid=req.body.proid;
    var proname=req.body.proname;
    var proprice=req.body.proprice;
    var catid=req.body.category_cmb;
    var proddata=new Product({
        productname:proname,
        productprice:proprice,
        category:catid
    });
        Product.findOneAndUpdate({ _id:proid},
            {$set:proddata},{new: true}, function (err, Products) {
            if (err) return res.status(500).send(
                "There was a problem updating.");
            res.status(200).send(Products);
        });
});

var port=8014;
app.listen(port);
console.log('app is listeninng on port:  '+port);

