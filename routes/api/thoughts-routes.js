const router = require("express").Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

// GET ALL THOUGHTS
router.get("/", (req, res) => {
  Thought.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET THOUGHT By ID
router.get("/:thoughtid", (req, res) => {
  Thought.findById(req.params.thoughtid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST NEW THOUGHT
router.post("/", (req, res) => {
  Thought.create(req.body)
    .then((data) => {
      console.log(data);
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: data._id } },
        { new: true }
      );
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE THOUGHT by ID
router.delete("/:thoughtid", (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.thoughtid })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//CREATE REACTION to exisiting thought
router.post("/:thoughtid/reactions/add", (req, res) => {
  console.log(req.body)
  Thought.findByIdAndUpdate(
    req.params.thoughtid,
    { $push: { reactions: req.body } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
