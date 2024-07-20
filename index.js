// Importing Modules
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

// Dependencies modules usage: 
app.use(bodyParser.json())
// folder "public" components are used and fetched here
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// MongoDB database connected:
mongoose.connect('mongodb://localhost:27017/Database')

// Connecting with database server and checking for the errors:
var db = mongoose.connection
db.on('error', () => console.log("Error in Connecting Database"))
db.once('open', () => console.log("Connected to Database"))

// input fields instances created for storing database:
app.post("/sign_up", (req, res) => {
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var password = req.body.password

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if(err)
        {
            throw err;
        }
        
        console.log("Record Inserted Successfully.")
    })

    // reuturn to the page after successfully loggeed in
    return res.redirect('signup_successful.html')
})

app.get("/", (req, res) => {
    // res.send("Server Connected successfully")
    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('index.html')

}).listen(3000);

console.log("Listening on port 3000")