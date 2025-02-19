import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import sequelize from "../config/config.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async(req, res) => {
  const { username, password } = req.body;

  try {
    const query = `
      SELECT * FROM user WHERE username = ?
    `;
    const [user] = await sequelize.query(query, {
      replacements: [username],
      type: sequelize.QueryTypes.SELECT,
    })
    // console.log(user);
    if(!user){
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect Username or Password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect Username or Password'
      });
    }

    const token = jwt.sign(
      {id_user: user.id_user, role:user.role},
      SECRET_KEY,
      {
        expiresIn: "1h"
      }
    );

    return res.json({
      status: "success",
      message: "Login Successfully",
      data: user,
      token
    })
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Error'
    })
  }
};