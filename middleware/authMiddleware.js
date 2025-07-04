const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    req.userId = decoded.id;

    // ✅ Debugging ke liye console
    console.log("🛡️ decoded.id:", decoded.id);
    console.log("🛡️ decoded.id typeof:", typeof decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
module.exports.protect = protect;
