const router = require("express").Router();
const User = require("../../models/User");

//GET USERS
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

//GET USER by ID
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
//CREATE USER
router.post("/", (req, res) => {
  User.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//UPDATE USER
router.put("/:userid", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid, req.body, { new: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE USER
router.delete("/:userid", (req, res) => {
  User.findOneAndDelete({ _id: req.params.userid })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//ADD A FRIEND TO AN EXISTING USER
router.put("/:userid/friends/add", (req, res) => {
  User.findByIdAndUpdate(req.params.userid, {$push: { friends: req.body.friend_id }}, { new: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE A FRIEND TO AN EXISTING USER
router.put("/:userid/friends/delete", (req, res) => {
  User.findByIdAndUpdate(req.params.userid, {$pull: { friends: req.body.friend_id }}, { new: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
