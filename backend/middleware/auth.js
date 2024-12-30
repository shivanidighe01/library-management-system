import jwt from "jsonwebtoken";

const jwt_secret='mysecretekeyof32bitlong'
// export const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Expecting 'Bearer <token>'
  
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Authentication token missing or invalid",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, jwt_secret);
//     req.user = decoded; // Attach decoded token data (e.g., user info) to the request object
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header:", authHeader);

  const token = authHeader;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing or invalid",
    });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    // console.log("Decoded Token:", decoded); // Log decoded token
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token Verification Error:", error.message); // Log error
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
