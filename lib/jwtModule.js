const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./private.key', 'utf8'); // to sign JWT
const publicKey = fs.readFileSync('./public.key', 'utf8'); // to verify JWT

module.exports = {
  sign: (payload, options) => {
    const signingOptions = {
      algorithm: 'RS256',
      expiresIn: 86400,
      issuer: 'https://myeffect-frontend.vercel.app/',
    };
    return jwt.sign(payload, privateKey, signingOptions);
  },

  parseTokenFromAuthorizationHeader: (req) => {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader || !authorizationHeader.includes('Bearer ')) {
      return null
    }
    return req.headers['authorization'].split(' ')[1]
  },

  verify: (token) => {
    const verifyOptions = {
      algorithm: ['RS256'],
      expiresIn: 86400,
      issuer: 'https://myeffect-frontend.vercel.app/'
    };
    try {
      return jwt.verify(token, publicKey, verifyOptions);
    } catch (err) {
      return null;
    }
  },

  decode: (token) => {
    return jwt.decode(token, { complete: true });
  }
}
