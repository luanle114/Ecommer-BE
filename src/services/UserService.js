const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = user;
    try{
      const checkUserEmail = await User.findOne({ email: email });
      if(checkUserEmail !== null){
        resolve({
          status: 'Error to create user',
          message: 'Email already exists',
        });
      }
      resolve({
        status: 'Success',
        message: 'User created successfully',
        data: checkUserEmail,
      });
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        phone
      });
      if(createdUser){
        resolve({
          status: 'Success',
          message: 'User created successfully',
          data: createdUser,
        });
      }
    }
    catch(err){
      reject(err);
    }
  });
};
const loginUser = async (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = userLogin;
    try{
      const checkUserEmail = await User.findOne({ email: email });
      if(checkUserEmail === null){
        resolve({
          status: 'Error to login user',
          message: 'Email not exists',
        });
      }
      const comparePass = bcrypt.compareSync(password, checkUserEmail.password);
      console.log("~ ~ comparePass:", comparePass);
      if(checkUserEmail)
      resolve({
        status: 'Success',
        message: 'User created successfully',
        data: checkUserEmail,
      });
    }
    catch(err){
      reject(err);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
}