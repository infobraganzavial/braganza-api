const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token)
  console.log(process.env.SECRET_KEY)
  if (!token || token.substring(0, 6) !== 'Bearer') return res.status(403).send({ data: 'No token provided!', err: true });
  token = token.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    console.log(decoded, 'decoded', err)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = { verifyToken: verifyToken };
module.exports = authJwt;