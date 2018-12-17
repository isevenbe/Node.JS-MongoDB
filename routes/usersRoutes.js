const usersModel = require("../models/usersModel");

module.exports = (app) => {
    app.get('/setup', function(req, res) {

        // create a sample user
        let florentin = new User({ 
          name: 'Florentin', 
          password: 'password',
          admin: true 
        });
      
        // save the sample user
        florentin.save(function(err) {
          if (err) throw err;
      
          console.log('User saved successfully');
          res.json({ success: true });
        });
      });
}