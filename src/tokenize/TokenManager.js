const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  },

  generateRefreshToken: (payload) => {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  },

  verifyRefreshToken: (token) => {
    try {
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verify(artifacts, process.env.REFRESH_TOKEN_KEY);

      return artifacts.decoded.payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
