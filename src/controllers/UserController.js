const UserService = require("../services/UserService")
const JwtService = require("../services/JwtService")

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-+.']\w+)*\.\w+([-+.']\w+)*$/;
    const isCheckEmail = reg.test(email);
    if(!name || !email || !password || !confirmPassword || !phone){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Please fill in all fields',
      });
    }
    if(!isCheckEmail){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Email is invalid',
      });
    }
    if(password !== confirmPassword){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Password and Confirm Password are not the same',
      })
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-+.']\w+)*\.\w+([-+.']\w+)*$/;
    const isCheckEmail = reg.test(email);
    if(!name || !email || !password || !confirmPassword || !phone){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Please fill in all fields',
      });
    }
    if(!isCheckEmail){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Email is invalid',
      });
    }
    if(password !== confirmPassword){
      return res.status(400).json({
        status: 'Error to create user',
        message: 'Password and Confirm Password are not the same',
      })
    }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if(!userId){
      return res.status(400).json({
        status: "Error",
        message: "The user id is required"
      })
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

const deleteUser = async(req, res) => {
  try {
    const userId = req.params.id;
    if(!userId){
      return res.status(400).json({
        status: "Error",
        message: "The user id is required"
      })
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  }
  catch(error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

const getAllUsers = async(req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  }
  catch(error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

const getUser = async(req, res) => {
  try {
    const userId = req.params.id;
    if(!userId){
      return res.status(400).json({
        status: "Error",
        message: "The user id is required"
      })
    }

    const response = await UserService.getUser(userId);
    return res.status(200).json(response);
  }
  catch(error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

const refreshToken = async(req, res) => {
  try {
    const token = req.headers.token.split(' ')[1];
    if(!token){
      return res.status(400).json({
        status: "Error",
        message: "The token id is required"
      })
    }

    const response = await JwtService.refreshTokenService(token);
    return res.status(200).json(response);
  }
  catch(error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  refreshToken,
};