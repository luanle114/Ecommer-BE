const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken, refreshTokenService } = require('./JwtService');

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
      // if(createdUser){
        resolve({
          status: 'Success',
          message: 'User created successfully',
          data: createdUser,
        });
      // }
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
      if(!comparePass){
        resolve({
          status: "Error",
          message: "The password or user is incorrect"
        })
      }
      const access_token = await generalAccessToken({
        id: checkUserEmail.id,
        isAdmin: checkUserEmail.isAdmin,
      })
      
      const refresh_token = await refreshTokenService({
        id: checkUserEmail.id,
        isAdmin: checkUserEmail.isAdmin,
      })
      resolve({
        status: 'Success',
        message: 'User created successfully',
        access_token,
        refresh_token
      });
    }
    catch(err){
      reject(err);
    }
  });
};

const updateUser = async(id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      });
      if(checkUser === null){
        resolve({
          status: "FAILED",
          message: "The user is not exist"
        });
      }
      
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true})
      resolve({
        status: "OK",
        message: "User is updated successfully.",
        data: updateUser
      })
    }
    catch(error) {
  
    }
  });
}

const deleteUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id
      });
      if(checkUser === null){
        resolve({
          status: "FAILED",
          message: "The user is not exist"
        });
      }
      
      await User.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "User is deleted successfully.",
      })
    }
    catch(error) {
      
    }
  });
}

const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
  
      resolve({
        status: "OK",
        message: "Get all users successfully.",
        data: allUser
      })
    }
    catch(error) {
      
    }
  });
}

const getUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: userId
      });
      if(user === null){
        resolve({
          status: "FAILED",
          message: "The user is not exist"
        });
      }
      resolve({
        status: "OK",
        message: "Get user successfully.",
        data: user
      })
    }
    catch(error) {
      
    }
  });
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
}