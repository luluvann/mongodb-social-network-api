const router = require("express").Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

//GET USERS
router.get("/", (req, res) => {
  User.find()
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
  User.findByIdAndUpdate(req.params.userid, req.body, { new: true })
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
      //delete associated thoughts to the deleted user
      Thought.deleteMany({ username: { $eq: data.username } })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).json(err);
        });

      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//ADD A FRIEND TO AN EXISTING USER
router.post("/:userid/friends/:friendid", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid,
    { $push: { friends: req.params.friendid } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  //when a user is adding another user as a friend, the first user gets also added as a friend to the user he/she is adding (mutuall adding)

  User.findByIdAndUpdate(
    req.params.friendid,
    { $push: { friends: req.params.userid } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//DELETE A FRIEND TO AN EXISTING USER
router.delete("/:userid/friends/:friendid", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid,
    { $pull: { friends: req.params.friendid } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  //when a user is deleted, that user is removed from his/her friends's list

  User.findByIdAndUpdate(
    req.params.friendid,
    { $pull: { friends: req.params.userid } },
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
