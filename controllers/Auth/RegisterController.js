const users = require("../../services/User");
const { generateAccessToken } = require("../../helpers/jwt");
const { hashPassword } = require("../../helpers/hash.js");



const Register = async (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const location = req.body.location;
  const name = req.body.name;
  const surname = req.body.surname;

  try { 
    const checkEmail = await users.findEmail(email);
    if (checkEmail.data.length > 0) {
      res.status(200).json({
        code: "already_exist_email",
        message: "Bu e-posta adı kullanılmaktadır. Lütfen giriş yapın.",
      });
      return false;
    }
    const checkPhone = await users.findPhone(phone);
    if (checkPhone.data.length > 0) {
      res.status(200).json({
        code: "already_exist_phone",
        message: "Bu telefon numarası kullanılmaktadır. Lütfen giriş yapın.",
      });
      return false;
    }
    add = await users.create({
      name: name,
      surname: surname,
      email:email,
      phone:phone,
      location:location,
      password: await hashPassword(password) 
    });
    if (add.status == "success"){
      res.status(201).json({
        code: "account_was_created_successfully",
        message: "Hesabınız başarıyla oluşturuldu!",
      });
    } else {
      res.status(500).json({
        code: "server_error",
        message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin.",
      });
    }
  } catch (err) {
    res.status(400).json({
      code: "error_missing_field", 
      message: "Bilgileri doldurduğunuza emin olun.",
    });
  }
};

module.exports = {
  Register,
};
