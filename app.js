//importing express to help us create our server easly 
var express = require("express")


//importing bodyParser to help us  parse the body which we get from the post method to the jason format aka oobject to be passed to the db
//body data is parsed so we need a body parser to parse data in body to json object 
var bodyParser = require("body-parser")

//which helps us to to create db and be conected to the db
var mongoose = require("mongoose")


//Calls the express function "express()" 
//and puts new Express application inside the app variable
//it made programming with node js easeir and puts additional features
const app = express()

app.use(bodyParser.json())

//you can find the ---static-- html files in the --public-- diretory
//to serve css ,javascript and html assets we should specify the directory of these assets
app.use(express.static('public'))

//it matches the content type header to the type option when we get a req to the server
//tells the server what type of data is actually sent.
app.use(bodyParser.urlencoded({
    extended:true
}))



//inslaizing the connection
mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopoLogy:true
});

var db= mongoose.connection;

db.on('error',()=>console.log("error inconnected to db"));
db.once('open',()=>console.log("connected to db"));


// inserting regestration information from user to the users collection in mydb db
app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
 // Create a MongoDB schema for your data
    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('page2home.html')

})

//check whether user to is saved in our db or move new user to register
app.post("/sign_in", async (req, res) => {
    fetchemail = req.body.email;
    fetchpassword = req.body.password;
     
    let Col = db.collection("users");
    let user = await Col.find({ email: fetchemail}).toArray();

    if (user.length > 0 && user[0].password == fetchpassword && user[0].email==fetchemail) {
        return res.redirect('page2home.html');
    } else {
        return res.redirect('page2.html');
    }
});

// creat reservasion schema and add to events collection
app.post("/form_padel",(req,res)=>{
        var Teamname = req.body.Teamname;
        var Selectdate = req.body.Selectdate;
        var Location =req.body.Location;
        var Time=req.body.Time;
        var Numberplayer=req.body.Numberplayer;
        var coatch=req.body.coatch;

      
        
     // Create a MongoDB schema for your data
        var data1 = {
            "Team-name": Teamname,
            "Date": Selectdate,
            "Location":Location,
            "Time":Time,
            "Number-of-players":Numberplayer,
            "coatch":coatch
        }
    
        db.collection('events').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('page2home.html')
    
    });
    // creat reservasion schema and add to events collection
    app.post("/form_yoga",(req,res)=>{
        var Name = req.body.Name;
        var Day=req.body.Day;
        var Time = req.body.Time;
        var TypeofYoga =req.body.TypeofYoga;
        var Coatch=req.body.Coatch;

    // Create a MongoDB schema for your data
        var data1 = {
            "Name": Name,
            "Day": Day,
            "Time":Time,
            "Type-of-Yoga":TypeofYoga,
            "Coatch":Coatch
        }
    
        db.collection('events').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('page2home.html')
    
    });
// creat reservasion schema and add to events collection
    app.post("/form_gymnastics",(req,res)=>{
        var Name = req.body.Name;
        var Trainingdays=req.body.Trainingdays;
        var TrainingTime = req.body.TrainingTime;
        var Subscriptionduration =req.body.Subscriptionduration;
        var CoatchSelectCoatch=req.body.SelectCoatch;

        // Create a MongoDB schema for your data
        var data1 = {
            "Name": Name,
            "Training-days": Trainingdays,
            "Training-Time":TrainingTime,
            "Subscription-duration":Subscriptionduration,
            "Coatch":CoatchSelectCoatch

        }
    
        db.collection('events').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('page2home.html')
    
    });
    // creat reservasion schema and add to events collection
    app.post("/form_hourse",(req,res)=>{
        var Name = req.body.Name;
        var Day=req.body.Day;
        var Membershiptype = req.body.Membershiptype;
        var Numberofperson =req.body.Numberofperson;
        var SelecttheCoatch=req.body.SelecttheCoatch;

        // Create a MongoDB schema for your data
        var data1 = {
            "Name": Name,
            " Day": Day,
            "Member-ship-type":Membershiptype,
            "Number-of-person":Numberofperson,
            "Coatch":SelecttheCoatch
        }
    
        db.collection('events').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('page2home.html')
    
    });
/*Access-Control-Allow-Origin "*" wildcard tells browsers 
 to allow any origin to access the resource. */

app.get("/",(req,res)=>{
    //who can access theh resourses
    res.set( {"Allow-access-Allow-Origin": '*'} )
    return res.redirect('page2home.html');}
    )
app.listen(3000,()=>{
    console.log("on port 3000")})