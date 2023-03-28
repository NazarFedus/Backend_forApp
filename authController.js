const User = require('./models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('./config');


const generateAccessToken = (id, email) => {
     const payload = {
          id,
          email
     }
     return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
     async registration(req, res){
          try{
               const errors = validationResult(req);
               if(!errors.isEmpty()){
                    return res.status(400).json({message: "Registration error", errors})
               }

               const {username, email, password} = req.body;

               const candidate = await User.findOne({email});
               if(candidate){
                    return res.status(400).json({message: "User with this email already exists"})
               }
               
               const hashPassword = bcrypt.hashSync(password, 7);
               const newUser = new User({username, email, password: hashPassword})
               await newUser.save();
               return res.json({message: "User was created!"});

          } catch(e){
               console.log(e);
               res.status(400).json({message: "Registration error."});
          }
     }

     async login(req, res){
          try{
               const {email, password} = req.body;
               const user = await User.findOne({email});
               if(!user){
                    return res.status(400).json({message: "User not found"});
               }

               const validPassword = bcrypt.compareSync(password, user.password);
               if(!validPassword){
                    return res.status(400).json({message: "Invalid password!"});
               }

               const token = generateAccessToken(user._id, user.email);
               return res.json({token});

          } catch(e){
               console.log(e);
               res.status(400).json({message: "LogIn error."})
          }
     }

     async getUsers(req, res){
          try{
               const users = await User.find();
               res.json(users)
          } catch(e){
               console.log(e);
          }
     }
}
module.exports = new authController();
