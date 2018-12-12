// import the NPM dependancy package
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// Connection to MongoDB
mongoose.connect("mongodb://sevendb:sevendb1@ds129904.mlab.com:29904/firstapi", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => { console.log("Connection to Mongoose Success..."); });

// Load my app
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());
require("./routes/modelRoutes")(app);


// choose what port on which to run the server
const port = process.env.PORT || 3000;

// use the app variable and listen on the port
app.listen(port , () => {
  console.log(`Server running on *${port}`);
});
