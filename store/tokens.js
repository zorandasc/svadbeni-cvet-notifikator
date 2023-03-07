const tokens = [
  {
    id: 1,
    expoToken: "ExponentPushToken[mTxhvpPbcVLupvhbZKgqYJ]",
  },
];

const addToken = (token) => {
  token.id = tokens.length + 1;
  tokens.push(token);
};

const getTokens = () => {
  return tokens
};

module.exports = {
  addToken,
  getTokens
};
