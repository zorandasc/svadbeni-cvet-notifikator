const mongoose = require("mongoose");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

//validacija dolaznog messega

const validateMessage = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  content: Joi.string().required(),
});

exports.message = Message;
exports.validateMessage = validateMessage;
