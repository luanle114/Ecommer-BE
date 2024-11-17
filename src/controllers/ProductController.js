const ProductService = require("../services/UserService")

const createProduct = async (req, res) => {
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

module.exports = {
  createProduct,
};