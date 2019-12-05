var mongoose=require('mongoose');
var express = require('express');
var session = require('express-session');
var filestore=require('session-file-store');
var bodyParser = require('body-parser');
var path=require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('view'));

mongoose.connect('mongodb://localhost:27017/product_db',{useNewUrlParser :true});
var db=mongoose.connection;
mongoose.set('useFindAndModify',false);
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

app.get('/login',function(req,res)
{
    //res.sendFile('login.html');
    res.sendFile(path.resolve(__dirname, 'view', 'login.html'));
});
app.use(session({
    secret: 'ssshhhhh',
    // store: new filestore({ path:'./session-data'}),
    saveUninitialized: false,
    resave: false
}));
//create schema
var AdminSchema = new mongoose.Schema({
    userName: {
        type:String,
        unique:true,
        required:true,
    
    },
    Password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:8,
    } 
  });
  
  var Admin = mongoose.model("Admin", AdminSchema,"Admins");
  //registration
  app.get('/Registration',(req,res)=>{
      //res.sendFile('Registration.html');
      res.sendFile(path.resolve(__dirname, 'view', 'Registration.html'));
  })
// Insert Data
app.post('/Registration', (req, res) => {
    var AdminData = new Admin({
         userName:req.body.userName,
         Password:req.body.password
         });
     console.log(AdminData);
   
     AdminData.save()
       .then(item => {
         res.send("item saved to database");
       })
       .catch(err => {
         res.status(400).send("unable to save to database");
       });
   
   });
   // END INSERT Data
   

//login
app.post('/login',function(req,response)
{
	var username=req.body.username;
	var password=req.body.password;
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
app.listen(8000);
