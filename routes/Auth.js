const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { Login } = require("../controllers/Auth/LoginController");
const { Register } = require("../controllers/Auth/RegisterController");

router.post(
  "/login",
  [
    check("password")
      .isLength({ min: 5, max: 15 })
      .withMessage("Şifre 5 ile 15 karakter arasında olması gerekmektedir.  ")
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(400).json({ status: "error", errors: error.errors });
    } else {
      next();
    }
  },
  Login
);
router.post(
  "/register",
  [
    check("phone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Telefon numaranız 11 haneli olmalıdır.")
      .trim(),
    check("email")
      .isEmail()
      .withMessage("Geçersiz E-Posta adresi girdiniz.")
      .normalizeEmail(),
    check("password")
      .isLength({ min: 5, max: 15 })
      .withMessage("Şifre 5 ile 15 karakter arasında olması gerekmektedir.")
      .matches(/\d/)
      .withMessage("Şifrenizde bir sayısal ifade olmalıdır."),

    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error("Şifreler eşleşmemektedir.");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(400).json({  status: "error", errors: error.errors  });
    } else {
      next();
    }
  },
  Register
);

module.exports = router;
