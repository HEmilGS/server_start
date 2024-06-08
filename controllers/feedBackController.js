const feedBackModel = require("../models/feedBackModel");

async function getFeedBackById(req, res) {
  const { id } = req.params;

  try {
    const feedBack = await feedBackModel.getFeedBackById(id);
    res.status(200).json(feedBack);
    console.log("feedBack", feedBack);
  } catch (err) {
    res.status(500).send("sos gilipollas en feedBack Controller ");
    console.log("This is an error in create user by id", err);
  }
}

async function createFeedBack(req, res) {
  const { user_id } = req.params;
  const feedBack = req.body;

  try {
    const newFeedBack = await feedBackModel.createFeedBack(feedBack, user_id);
    res.status(201).json(newFeedBack);
  } catch (err) {
    res.status(500).send("sos gilipollas en feedBack Controller");
    console.log("This is an error in create FeedBack", err);
  }
}

module.exports = { getFeedBackById, createFeedBack };
