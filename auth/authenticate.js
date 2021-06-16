const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieInfo = req.headers.cookie.split("; ");
    const user = {
      [cookieInfo[0].split("=")[0]]: cookieInfo[0].split("=")[1],
      [cookieInfo[1].split("=")[0]]: cookieInfo[1].split("=")[1],
    };
    if (user.token) {
      const decodedToken = jwt.verify(user.token, process.env.TOKEN_SECRET);
      // const trueName = user.name.replace(/%20/g, " ");
      if (decodedToken.contact === user.contact) {
        res.locals.companyName = decodedToken.companyName;
        res.locals.userName = decodedToken.userName;
        res.locals.address = decodedToken.address;
        res.locals.email = decodedToken.email;
        res.locals.contact = decodedToken.contact;
      return next();
      }
    }
  }
  return res
    .status(403)
    .json({ message: "You need to login to complete the action" });
};
