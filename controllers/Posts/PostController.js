const posts = require("../../services/Posts");

const Post = async (req, res) => {
    const postId = req.params.id;
    try {
      result = await posts.get(postId);
      if (typeof result.data[0] == "object") {
        res.json(result.data);
      } else {
        console.log(result);
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
    Post,
  };
  