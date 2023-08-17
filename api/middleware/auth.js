const jwt = require("jsonwebtoken");
const secret = "f834rfnjefn934rhfeuifn34fj";

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("token from ミドルウェア", token);
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
