const usersModel = require("../models/usersModel");
const jwt = require('jsonwebtoken');
module.exports = (app) => {

  app.get("/users", (req, res) => {
    usersModel.find({}, (err, users) => {
      res.json(users);
    })
  })

  app.post("/authenticate", (req, res) => {
    usersModel.findOne({
      name: req.body.name
    }, function (err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            admin: user.admin
          };
          let token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: "24h" // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }

    });
  });

  app.use('/api', apiRoutes);

}