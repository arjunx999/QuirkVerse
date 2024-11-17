import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); // Retrieve token from the header

    if (!token) {
      return res.status(403).json({ msg: "Access Denied: No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); // Remove "Bearer" prefix
    } else {
      return res.status(400).json({ msg: "Invalid token format" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = verified; // Attach user info to the request object

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token", error: error.message });
  }
};
