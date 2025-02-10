const { body, validationResult } = require("express-validator");

const Validation = {
    validateUserUpdate:[
    body("fullName").notEmpty().withMessage("Họ và tên không được để trống"),
    body("phone")
      .custom((value) => {
        if (value === "") return true; // Nếu phone là "", bỏ qua kiểm tra
        if (!/^(0\d{9}|84\d{9})$/.test(value)) { 
          throw new Error("Số điện thoại không hợp lệ, phải đúng định dạng Việt Nam");
        }
        return true;
      }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
        }
    ],

    };

module.exports = Validation
