
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SCERET_KEY = process.env.SCERET_KEY ;

const auth = (req,res,next) =>{

      try {
           
            let token = req.headers.authorization;
            if (token) {
                  token = token.split(" ")[1];
                  let user = jwt.verify(token, SCERET_KEY);
                  req.userID = user.id;
            }else{
                  return res.status(401).json({message :"Unauthorider mil nhi rha hai"});
            }
            next();
      } catch (error) {
           
            console.log(error);
            res.status(401).json({message :"Unauthorider user"});
      }

}

module.exports = auth;