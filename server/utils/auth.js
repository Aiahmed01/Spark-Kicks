const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      
    } catch(err) {
      console.log(err);
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id, isAdmin }) {
    const payload = { firstName, email, _id, isAdmin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

//handling user roles
// exports.authorizeRoles = (...roles) => {
  
//     if(!roles.includes(req.user.role)) {
//       console.log(req.user.role);
//       res.status(403).json({ message: "You are not authorized to perform this action as "+ req.user.role});
//       return next(new Error("You are not authorized to perform this action as "+ req.user.role));
      
//   }
   

// }