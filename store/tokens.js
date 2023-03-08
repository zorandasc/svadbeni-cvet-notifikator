/*
  {
    id: 1,
    expoToken: "ExponentPushToken[mTxhvpPbcVLupvhbZKgqYJ]",
  },
*/

const tokens = [];

const getTokens = () => {
  return tokens;
};

const addToken = (token) => {
  token.id = tokens.length + 1;
  tokens.push(token);
};

const findToken = (expoToken) => {
  return tokens.find((token) => token.expoToken === expoToken);
};

module.exports = {
  addToken,
  getTokens,
  findToken,
};
