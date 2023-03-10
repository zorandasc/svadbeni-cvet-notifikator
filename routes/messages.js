const express = require("express");
const router = express.Router();
const { Expo } = require("expo-server-sdk");

const sendPushNotification = require("../utilities/pushNotifications");
const { message: MessageDB, validateMessage } = require("../models/message");
const { expoToken: ExpoTokenDB } = require("../models/expoToken");
const validateObjectId = require("../middleware/validateObjectId");
const validation = require("../middleware/validation");

//GATSBY FORM REQUEST
router.post("/", validation(validateMessage), async (req, res) => {
  let messageToAllTokens = [];

  const { name, email, content } = req.body;

  //ADD TO STORe
  const newMessage = new MessageDB({
    name: name,
    email: email,
    content: content,
    dateTime: new Date().toLocaleString(),
  });

  await newMessage.save();

  const tokens = await ExpoTokenDB.find();

  if (tokens.length == 0) {
    return res.status(201).send("NO tokens in array");
  }

  for (let pushToken of tokens) {
    pushToken = pushToken.token;
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messageToAllTokens.push({
      to: pushToken,
      sound: "default",
      title: "Nova poruka od Svadbenog Cveta!",
      body: `Ime: ${name}, Email: ${email}`,
      data: { name, email, content },
    });

    await sendPushNotification(messageToAllTokens);

    res.status(201).send();
  }
});

//REACT-NATIVE GET ALL MESSAGES
router.get("/", async (req, res) => {
  const messages = await MessageDB.find().sort([["dateTime", -1]]);
  res.send(messages);
});

//REACT-NATIVE DELETE MESSAGE
router.delete("/:id", validateObjectId, async (req, res) => {
  await MessageDB.findByIdAndDelete(req.params.id);
  res.status(201).send();
});

module.exports = router;
