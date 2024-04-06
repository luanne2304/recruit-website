const jwt = require('jsonwebtoken');

const Authorization = {
     authenticateUser : async (req, res, next) => {
        
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        if (data) {
            req.params = data._id;
            next();
        }
        
      }
       
};



//when user login, the server will generate a token and send it back to the client




module.exports = Authorization;