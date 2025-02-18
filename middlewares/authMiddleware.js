import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided'
    })
  }
  
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        status: 'error',
        message: 'Failed to authenticate token'
      });
    }

    console.log("Decoded Token", decoded);
    req.userId = decoded.id_user;
    req.userRole = decoded.role;

    next()
  })
};

export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    console.log("User Role: ", req.userRole);
    console.log("Allowed Roles: ", allowedRoles);
    
    if(!allowedRoles.includes(req.userRole)){
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.'
      });
    }
    next();
  }
};