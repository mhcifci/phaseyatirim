const posts = require("../../services/Posts");

const Posts = async (req, res) => {
  
    try {
      result = await posts.getAll();
      if (typeof result.data[0] == "object") {
        res.json(result.data);
      } else {
        res.json({
            code: "nothing_found",
            message: "İçerik bulunamadı, lütfen sayfasınızı yenileyin."
        });
      }
    } catch (err) {
      res.status(400).json({
        code: "not_valid_request",
        message: "Bilgileri doldurduğunuza emin olun.",
      });
    }

  };
  
  module.exports = {
    Posts,
  };
  