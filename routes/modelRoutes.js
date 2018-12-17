const studentModels = require("../models/studentModel");

module.exports = (app) => {

  app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({ 
      name: 'Nick Cerminara', 
      password: 'password',
      admin: true 
    });
  
    // save the sample user
    nick.save(function(err) {
      if (err) throw err;
  
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

  app.get("/student", (req, res) => {
    studentModels.find((err, student) => {
      if (err)
        console.log('ERROR :', err);
      res.send(student);
    });
  });

  app.get("/student/:id", (req, res) => {
    let id = req.params.id;
    studentModels.findOne({ _id: id }).then(result => {
      res.send(result);
      console.log(`${result._id} as fetched`);
    });
  });

  app.post("/student", (req, res) => {
    let student = new studentModels();
    student.studentName = req.body.studentName;
        student.nextWatchDate = "";
    student.nextWatchSubject = "";


    student.save(function (err) {
      if (err) {
        res.send(err);
      }
    });
    console.log("______________________________________________________________________________________");
    console.log(`User : ${student.studentName} as been CREATED under id : ${student._id}`);
    console.log("______________________________________________________________________________________");
    res.sendStatus(201);
  });

  app.put("/student/:id", (req, res) => {
    let id = { _id: req.params.id};
    let studentName = { studentName: res.studentName}
    let updatedValue = {
      $set: {
        nextWatchDate: req.body.nextWatchDate,
        nextWatchSubject: req.body.nextWatchSubject,
      },
      $push: {
        pastWatchDate: req.body.nextWatchDate,
        pastWatchSubject: req.body.nextWatchSubject
      }
    }
    studentModels.updateOne(id, updatedValue, (err, res) => {
      if (err) throw err;
      console.log("______________________________________________________________________________________");
      console.log(`User : ${studentName.studentName} as been UPDATED under id : ${id._id}`);
      console.log(`Information UPDATED : WatchDate : ${updatedValue.$set.nextWatchDate} WatchSubject : ${updatedValue.$set.nextWatchSubject}`);
      console.log("______________________________________________________________________________________");
    });

    res.sendStatus(200)
  });

  app.delete("/student/:id", (req, res) => {
    let id = { _id: req.params.id };
    studentModels.deleteOne(id, (err, res) => {
      if (err) throw err;
      console.log(`${id._id} as been deleted`);
    });
    res.sendStatus(200)
  });
}