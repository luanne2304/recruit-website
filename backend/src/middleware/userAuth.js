const jwt = require('jsonwebtoken');
const authController= require('../Controllers/authController');

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
              const refreshToken = req.cookies.refreshToken; 
              if(refreshToken==null)
                return res.sendStatus(401);

              jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user2) => {
                if(err)
                  return res.sendStatus(401);
                else{
                  if(authController.verifyRefreshToken(user2._id,refreshToken)){
                    const newAccessToken = authController.generateAuthToken(user2);    
                    res.setHeader("Authorization", `Bearer ${newAccessToken}`);
                    console.log("111");
                    req.user = user2;
                    next();
                  }
                  else{
                    return res.sendStatus(401);
                  }
                }
              })
            
          }
          else{
            req.user = user;
            console.log("222");
            next(); // Tiếp tục tiến hành xử lý request
          }
      });
      },

      verifyTokenAndUserAuthorization: async (req, res, next) => {
        Authorization.authenticateUser(req, res, () => {
          if (req.user.id === req.params.id|| req.user.isAdmin) {
            next();
          } else {
            return res.sendStatus(403);
          }
        });
      },
      
      verifyTokenAndAdmin: async (req, res, next) => {
            Authorization.authenticateUser(req, res, () => {
          if (req.user.isAdmin) {
            next();
          } else {
            return res.sendStatus(403);
          }
        });
      }

      

};



//when user login, the server will generate a token and send it back to the client




module.exports = Authorization;