const router = require("express").Router();
const User = require("../../models/User");

//READ (FIND) REQUESTS
router.get("/", (req, res) => {
  User.find()
    .populate({
      path: "thoughts",
      select: "-__v"})
/*     .populate({
      path: "friends",
      select: "-__v"
    }) */
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.get("/:userid", (req, res) => {
  User.findById(req.params.userid)
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//POST CREATE REQUESTS
router.post("/", (req, res) => {
  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//UPDATE PUT REQUESTS
router.put("/:userid", (req, res) => {
  User.findByIdAndUpdate(req.params.userid, req.body, { new: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//DELETE DELETE REQUESTS
router.delete("/:userid", (req, res) => {
  User.findOneAndDelete({ _id: req.params.userid })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
