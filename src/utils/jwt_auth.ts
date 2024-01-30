import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET
const JWT_ALGORITHN=process.env.JWT_ALGORITHN
const JWT_SHORT_EXPIRESIN=process.env.JWT_SHORT_EXPIRESIN
const JWT_LONG_EXPIRESIN=process.env.JWT_LONG_EXPIRESIN

const JWT_AUTH = {
  matchPassword: async (userPassword, savedPassword) => {
    return await bcrypt.compare(userPassword, savedPassword);
  },
  generateToken: (payLoad: string) => {
    return jwt.sign(payLoad, JWT_SECRET, {
      algorithm: JWT_ALGORITHN,
      expiresIn: JWT_SHORT_EXPIRESIN
    });
  },
  generateRefleshToken: () => {
    return jwt.sign({}, JWT_SECRET, {
      algorithm: JWT_ALGORITHN,
      expiresIn: JWT_LONG_EXPIRESIN
    });
  },
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { isDecode: true, decoded };
    } catch (error) {
      if (error.message === "jwt expired") {
        return { isDecode: false, message: error.message };
      } else {
        return { isDecode: false, message: "invalid Token" };
      }
    }
  },
  verifyRefleshToken: async (token, savedToken) => {
    if (token !== savedToken) {
      return { isDecode: false, message: "invalid Token" };
    } else {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { isDecode: true, decoded };
      } catch (error) {
        if (error.message === "jwt expired") {
          return { isDecode: false, message: error.message };
        } else {
          return { isDecode: false, message: "invalid Token" };
        }
      }
    }
  }
};

export default JWT_AUTH;
