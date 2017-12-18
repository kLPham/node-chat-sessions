let messages = [];
let id = 0;

module.exports = {
  //create method to add the new message object to the messages array on session
  create: (req, res) => {
    const { text, time } = req.body;
    const { user } = req.session;
    messages.push({ id, text, time });
    user.messages.push({ id, text, time });
    id++;
    res.status(200).send(messages);
  },

  read: (req, res) => {
    res.status(200).send(messages);
  },

  update: (req, res) => {
    const { text } = req.body;
    const updateID = req.query.id;
    const messageIndex = messages.findIndex(message => message.id == updateID);
    let message = messages[messageIndex];

    messages[messageIndex] = {
      id: message.id,
      text: text || message.text,
      time: message.time
    };

    res.status(200).send(messages);
  },

  delete: (req, res) => {
    const deleteID = req.query.id;
    messageIndex = messages.findIndex(message => message.id == deleteID);
    messages.splice(messageIndex, 1);
    res.status(200).send(messages);
  },

  //Create a history method that will return all messages on a user's session
  history: (req, res) => {
    const { user } = req.session;
    res.status(200).send(user.messages);
  }
};
