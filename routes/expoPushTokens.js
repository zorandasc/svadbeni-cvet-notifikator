const express = require("express");
const router = express.Router();
const {
  expoToken: ExpoTokenDB,
  validateToken,
} = require("../models/expoToken");
const validation = require("../middleware/validation");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/", validation(validateToken), async (req, res) => {
  //ako je toekn vec storovan nemoj ga ponovo storovati
  const tokenInStore = await ExpoTokenDB.findOne({ token: req.body.token });
  if (tokenInStore) return res.status(201).send("Token already in store.");

  //kreiraj novi token u bazi
  const newToken = new ExpoTokenDB({
    token: req.body.token,
  });

  await newToken.save();

  res.status(201).send(`Token added: ${newToken.token}`);
});

router.get("/", async (req, res) => {
  const tokens = await ExpoTokenDB.find();
  res.send(tokens);
});

//REACT-NATIVE DELETE
router.delete("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;

  await ExpoTokenDB.findByIdAndDelete(id);

  res.status(201).send("token deleted");
});

module.exports = router;
