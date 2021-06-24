const router = require("express").Router();
const Thought = require("../../models/Thought");
const User = require("../../models/User");

router.get("/", (req, res) => {
  Thought.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:thoughtid", (req, res) => {
  Thought.findById(req.params.thoughtid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Thought.create(req.body)
  .then(data => {
    console.log(data);
      return User.findOneAndUpdate(
          {username: req.body.username}, 
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

module.exports = router;
