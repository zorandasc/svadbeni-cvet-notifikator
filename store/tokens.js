/*
  {
    id: 1,
    expoToken: "ExponentPushToken[mTxhvpPbcVLupvhbZKgqYJ]",
  },
*/

const tokens = [];

getTokens = () => {
  return tokens;
};

const addToken = (token) => {
  token.id = tokens.length + 1;
  tokens.push(token);
};

module.exports = {
  addToken,
  getTokens,
};
