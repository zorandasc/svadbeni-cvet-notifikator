let messages = [];

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
