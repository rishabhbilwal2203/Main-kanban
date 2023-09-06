const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/create", async (req, res) => {
    const {title, description} = req.body;
    const newTask = new Task({title, description});
    await newTask.save();
    res.status(200).json({_id: newTask._id, title: newTask.title, description: newTask.description, droppableId: newTask.droppableId});
})

router.get("/fetch", async(req, res) => {
    result = await Task.find({});
    if(!result) return res.json({error: "problem in fetching the tasks"})
    res.status(200).json({result});
})

router.put("/update/:id", async(req, res) => {
    const {title, description, droppableId} = req.body
    const task = await Task.findById(req.params.id);
    task.title = title;
    task.description = description;
    task.droppableId = droppableId;
    await task.save();
    res.status(200).json({task, message: "updated"});
})

router.delete("/delete/:id", async(req, res) => {
    // const {taskId} = req.body;

    const result = await Task.findByIdAndRemove(req.params.id);
    if(!result) return res.status(404).json({error: "not found"});
    // console.log(result);
    res.status(200).json({result});
})

module.exports = router;