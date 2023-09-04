const express = require("express");
const path = require("path"); 
const app = express();//call the express fun and puts new express application inside the app var jt like you are creating an object of a class
const mongoose = require('mongoose');//node.js based object data modeling library use for mapping realation into mongod
const bodyparser = require("body-parser"); //use for context of post,put,patch http request where the information you want is contained in the body i.e allows you to access req.

//mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  }
const port = 8000;
// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({
    extended:true
}))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template view engine as pug where view engine as key
app.set('views', path.join(__dirname, 'views')) // Set the views directory where path is build-in node.js module used for handling file paths, and __dirname is special node.js variable that represents the absolute path of directory that contains the currently executing script.
 
// ENDPOINTS
app.get('/', (req, res)=>{ //'/' url path for the route
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ //call back function which represent the http request,res
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})
// Get a specific contact

//Update contact
// app.get('/update', (req, res) => {
//     const params = {};
//     res.status(200).render('update.pug', params);
// });
  
// app.post('/update', (req, res) => {
//     const id = req.body.id;
//     const newData = {
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email,
//         address: req.body.address,
//         desc: req.body.desc
//     };

//     Contact.findByIdAndUpdate(id, newData, { new: true })
//     .then((contact) => {
//         res.send(`Contact ${id} has been updated successfully`);
//     })
//     .catch((err) => {
//         res.status(400).send(`Error updating contact ${id}: ${err.message}`);
//     });
// });
  

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});