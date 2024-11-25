var express = require("express");
var router = express.Router();
const Task = require("../models/Task");
/* GET home page. */
console.log("hello from index.js");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
    console.log("all tasks", tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occurred");
  }
});
router.get(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const task = await Task.findById(id);
    console.log("into the id find");

    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.json(task);
    console.log(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occurred");
  }
});
router.post("/", async (req, res) => {
  try {
    console.log("ider sa to done h");
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status });
    console.log("task", title, description, status);

    // console.log("hello title", task.title);
    // console.log("hello title", task.description);

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occurred hihu");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
