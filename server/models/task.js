const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    droppableId:{
        type: String,
        default: "todo"
    }
})

module.exports = mongoose.model("Task", taskSchema);