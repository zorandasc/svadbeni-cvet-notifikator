const express = require("express");
const router = express.Router();
const Joi = require("joi");

const tokenStore = require("../store/tokens");
const validateWith = require("../middleware/validation");

router.post(
  "/",
  [validateWith({ token: Joi.string().required() })],
  (req, res) => {
    if (tokenStore.findToken(req.body.token)) {
      console.log("Already in tokens array.");
      return res.status(201).send();
    }

    tokenStore.addToken({
      expoToken: req.body.token,
    });
    console.log("Token added: ");
    res.status(201).send();
  }
);

module.exports = router;
