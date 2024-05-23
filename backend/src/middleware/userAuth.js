const jwt = require('jsonwebtoken');

const Authorization = {
     authenticateUser : async (req, res, next) => {
        
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      if (token == null) {
          // Nếu không có token, trả về lỗi 401
          return res.sendStatus(401);
      }
  
      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
          if (err) {
              // Nếu token không hợp lệ, trả về lỗi 403
              return res.sendStatus(403);
          }
          req.user = user;
          next(); // Tiếp tục tiến hành xử lý request
      });
        
      }
       
};



//when user login, the server will generate a token and send it back to the client




module.exports = Authorization;