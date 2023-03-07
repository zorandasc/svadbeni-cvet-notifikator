let messages = [
  {
    name: "duca",
    email: "duca@email.com",
    content: "Is this still available?",
    id: 1,
    dateTime: 1586044521956,
  },
  {
    name: "marija",
    email: "marija@email.com",
    content: "I'm interested in this item. Do you provide free delivery?",
    id: 2,
    dateTime: 1586044521956,
  },
  {
    name: "maca",
    email: "maca@email.com",
    content: "Please give me a call and we'll arrange this for you.",
    id: 3,
    dateTime: 1586044521956,
  },
];

const getMessages = () => {
  return messages;
};

const addMessage = (message) => {
  message.id = Date.now().toString();
  message.dateTime = new Date().toLocaleString();
  messages.unshift(message);
};

const deleteMessage = (id) => {
  messages = messages.filter((msg) => msg.id != id);
};

module.exports = { addMessage, getMessages, deleteMessage };
