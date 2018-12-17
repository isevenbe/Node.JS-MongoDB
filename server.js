// import the NPM dependancy package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const url = process.env.MONGOLAB_URI;
const config = require('./config');
var apiRoutes = express.Router(); 

// Connection to MongoDB
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => { console.log("Connection to Mongoose Success !"); });

// Load my app
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use morgan to log requests to the console
// app.use(morgan('dev'));
require("./routes/modelRoutes")(app, apiRoutes);
require("./routes/usersRoutes")(app, apiRoutes);

//send a basic path when you go on the API
app.get('/', function (req, res) {
  res.send("Hello before starting you must go on my <a href='https://github.com/isevenbe/Node.JS-MongoDB'>GutHub repository</a>");
});

// secret variable
app.set('superSecret', config.secret);

// choose what port on which to run the server
const port = process.env.PORT || 3000;

// use the app variable and listen on the port
app.listen(port, () => {
  console.log(`Server running on *${port}`);
});
