const User = require('./models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

class authController {
     async registration(req, res){
          try{
               const errors = validationResult(req);
               if(!errors.isEmpty()){
                    return res.status(400).json({message: "Registration error", errors})
               }

               const {username, email, password} = req.body;
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

          } catch(e){
               console.log(e);
          }
     }

     async getUsers(req, res){
          try{
               res.json("server work")
          } catch(e){
               console.log(e);
          }
     }
}
module.exports = new authController();