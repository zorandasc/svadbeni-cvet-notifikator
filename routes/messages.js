const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Expo } = require("expo-server-sdk");

const messagesStore = require("../store/messages");
const tokenStore = require("../store/tokens");
const validateWith = require("../middleware/validation");
const sendPushNotification = require("../utilities/pushNotifications");

const schema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
};

router.get("/", (req, res) => {
  const messages = messagesStore.getMessages();
  res.send(messages);
});

router.post("/", [validateWith(schema)], async (req, res) => {
  let messageToAllTokens = [];
  const { name, email, message } = req.body;

  //ADD TO LOCAL STORE
  messagesStore.addMessage({
    name,
    email,
    content: message,
  });

  for (let pushToken of tokenStore.getTokens()) {
    pushToken = pushToken.expoToken;
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messageToAllTokens.push({
      to: pushToken,
      sound: "default",
      title: "Nova poruka od Svadbenog Cveta!",
      body: `Ime: ${name}, Email: ${email}`,
      data: { name, email, message },
    });

    await sendPushNotification(messageToAllTokens);

    res.status(201).send();
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  messagesStore.deleteMessage(id);

  res.status(201).send();
});

module.exports = router;
