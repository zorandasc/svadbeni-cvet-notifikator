const mongoose = require("mongoose");
const Joi = require("joi");

const expoTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const ExpoToken = mongoose.model("ExpoToken", expoTokenSchema);

//validacija dolaznog tokena
const validateToken = Joi.object({
  token: Joi.string().required(),
});

exports.expoToken = ExpoToken;
exports.validateToken = validateToken;
