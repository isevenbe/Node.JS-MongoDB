const mongoose = require("mongoose");

const SchemaStudent = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    nextWatchDate: {
        type: String
    },
    nextWatchSubject: {
        type: String
    },

    pastWatchDate: {
        type: Array
    },
    pastWatchSubject: {
        type: Array
    }
});

module.exports = studentModels = mongoose.model("SchemaStudent", SchemaStudent);
