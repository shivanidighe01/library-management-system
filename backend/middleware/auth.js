import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']; // lowercase key
  console.log('Headers:', req.headers); // ✅ Log all headers
  console.log('Authorization:', authHeader);

//   if (!authHeader || !authHeader.startsWith(' ')) {
//     return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
//   }
  
  const token = authHeader || authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


export const authByRole=(...allowedRole)=>{
  return (req,res,next)=>{
    if(!allowedRole.includes(req.user.role))
    {
      return res.status(400).json({
        message:"Access denied"
      })
    }
    next();
  }
}