const router = require('express').Router();
const  Thought  = require('../../models/Thought');

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
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

module.exports = router;