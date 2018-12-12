const studentModels = require("../models/MyModel")

module.exports = (app) => {

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
    student.pastWatch = "";
    student.nextWatchSubject = "";
    student.pastWatchDate = new Array();
    student.pastWatchSubject = new Array();

    student.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send({ message: "Student Added IN DB" });
    });
  });

  app.put("/student/:id", (req, res) => {
    let id = { _id: req.params.id };
    let updatedValue = {
      $set: {
        studentName: req.body.studentName,
        nextWatchDate: req.body.nextWatchDate,
        pastWatch: req.body.pastWatch,
        nextWatchSubject: req.body.nextWatchSubject,
        pastWatchDate: req.body.pastWatchDate,
        pastWatchSubject: req.body.pastWatchSubject
      }
    }

    studentModels.updateOne(id, updatedValue, (err, res) => {
      if (err) throw err;
      console.log(`${id._id} as been update`);
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