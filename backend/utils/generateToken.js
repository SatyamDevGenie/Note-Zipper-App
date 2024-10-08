import JWT from "jsonwebtoken";

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "500d",
  });
};

export default generateToken;
