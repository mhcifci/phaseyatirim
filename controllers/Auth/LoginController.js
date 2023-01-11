const users = require("../../services/User");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../helpers/jwt");
const { body, validationResult } = require("express-validator");

const Login = async (req, res) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  try {
    if (phone) {
      result = await users.findPhone(phone);
    } else if (email){
      result = await users.findEmail(email);
    } 
    if (typeof result.data[0] == "object") {
      const userData =  result.data[0];
      dPassword = result.data[0].password;
      bcrypt.compare(password, dPassword, function (err, result) {
        // Compare'dan gelen veri eğer "undefined" değilse.
        if (err == "undefined") {
          res.status(500).json({
            code: "server_error",
            message: err,
          });
          return false;
        }

        // Gelen şifre verisi hash ile eğer aynı değilse.
        if (result != true) {
          res.status(400).json({
            code: "password_is_not_valid",
            message: "Lütfen şifrenizi kontrol ediniz.",
          }); 
          return false;
        }
        // Burada artık token'ı üreteceğiz.
        const accessToken = generateAccessToken(email);
        
        res.json({
          token: accessToken,
          userData
        });
        return;
      });
    } else {
      res.status(401).json({
        code: "user_not_found",
        message: "Kullanıcı bulunamadı, lütfen bilgilerinizi kontrol edin.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      code: "not_valid_request",
      message: "Bilgileri doldurduğunuza emin olun.",
    });
  }

};

module.exports = {
  Login,
};
