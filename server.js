// import the NPM dependancy package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const url = process.env.MONGOLAB_URI;
const config = require('./config');
const apiRoutes = express.Router(); 

// Connection to MongoDB
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => { console.log("Connection to Mongoose Success..."); });

// Load my app
let app = express.Router();

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

apiRoutes.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded; next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});
// choose what port on which to run the server
const port = process.env.PORT || 3000;

// use the app variable and listen on the port
app.listen(port, () => {
  console.log(`Server running on *${port}`);
});
