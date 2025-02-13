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

    validateCreateCO: [
        body("nameCO").notEmpty().withMessage("Tên công ty không được để trống"),
        body("desCO").notEmpty().withMessage("Mô tả không được để trống"),
        body("linkCO").optional().isURL().withMessage("Link công ty phải là URL hợp lệ"),
        body("scaleto").notEmpty().withMessage("Quy mô đến không được để trống")
            .isNumeric().withMessage("Quy mô đến phải là số"),
        body("scalefrom").notEmpty().withMessage("Quy mô từ không được để trống")
            .isNumeric().withMessage("Quy mô từ phải là số"),
        body("taxcode").notEmpty().withMessage("Mã số thuế không được để trống")
            .isLength({ min: 10, max: 13 }).withMessage("Mã số thuế phải từ 10-13 ký tự"),
        body("iDusermanager").notEmpty().withMessage("ID người quản lý không được để trống"),
        body("listaddress").notEmpty().withMessage("Danh sách địa chỉ không được để trống")
            .custom((value) => {
                try {
                    const parsedList = JSON.parse(value);
                    if (!Array.isArray(parsedList) || parsedList.length === 0) {
                        throw new Error("Danh sách địa chỉ phải là một mảng có ít nhất một phần tử");
                    }
                    parsedList.forEach(addr => {
                        if (!addr.city || !addr.district || !addr.ward || !addr.streetnumber) {
                            throw new Error("Mỗi địa chỉ phải có đầy đủ city, district, ward, streetnumber");
                        }
                    });
                    return true;
                } catch (err) {
                    throw new Error("Danh sách địa chỉ phải là JSON hợp lệ");
                }
            }),
        
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }
            next();
        }
    ],

    validateUpdateCO: [
        body("nameCO").notEmpty().withMessage("Tên công ty không được để trống"),
        body("desCO").notEmpty().withMessage("Mô tả không được để trống"),
        body("linkCO").optional().isURL().withMessage("Link công ty phải là URL hợp lệ"),
        body("scaleto").notEmpty().withMessage("Quy mô đến không được để trống")
            .isNumeric().withMessage("Quy mô đến phải là số"),
        body("scalefrom").notEmpty().withMessage("Quy mô từ không được để trống")
            .isNumeric().withMessage("Quy mô từ phải là số"),
        body("listaddress").notEmpty().withMessage("Danh sách địa chỉ không được để trống")
            .custom((value) => {
                try {
                    const parsedList = JSON.parse(value);
                    if (!Array.isArray(parsedList) || parsedList.length === 0) {
                        throw new Error("Danh sách địa chỉ phải là một mảng có ít nhất một phần tử");
                    }
                    parsedList.forEach(addr => {
                        if (!addr.city || !addr.district || !addr.ward || !addr.streetnumber) {
                            throw new Error("Mỗi địa chỉ phải có đầy đủ city, district, ward, streetnumber");
                        }
                    });
                    return true;
                } catch (err) {
                    throw new Error("Danh sách địa chỉ phải là JSON hợp lệ");
                }
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
