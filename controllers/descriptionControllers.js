const descriptionModel = require("../models/descriptionModel");

async function getDescriptionById(req, res) {
    const { id } = req.params;

    try {
        const description = await descriptionModel.getDescriptionById(id);
        res.status(200).json(description);
        console.log('description', description)
        console.log("si sirve")
    } catch (err) {
        res.status(500).send('sos gilipollas en description Controller ');
        console.log('This is an error in create user by id', err);
    }
}



async function createDescription(req, res) {
    const { user_id } = req.params;
    const {description, prescription} = req.body;
  
    try {
      const newDescription = await descriptionModel.createDescription(description, prescription, user_id);
      res.status(201).json(newDescription);
    } catch (err) {
      res.status(500).send("sos gilipollas en feedBack Controller");
      console.log("This is an error in create FeedBack", err);
    }
  }


module.exports = { getDescriptionById, createDescription };