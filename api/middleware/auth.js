const jwt = require("jsonwebtoken");
const secret = "f834rfnjefn934rhfeuifn34fj"; // この部分は適切な秘密キーに変更してください。

// module.exports = (req, res, next) => {
//   console.log("ミドルウェア確認：", req.cookies);
//   try {
//     // クッキーからトークンを取得
//     const token = req.cookies.token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Authentication failed: No token provided." });
//     }

//     // トークンの検証
//     const decoded = jwt.verify(token, secret);
//     req.userData = decoded;

//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: "Authentication failed: Token is invalid or expired." });
//   }
// };

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided." });
    }
    const decoded = jwt.verify(token, secret);
    req.userData = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token is invalid or expired." });
  }
};
