const Product = require('../models/ProductModel');
const bcrypt = require('bcrypt');

const createProduct = async (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, price, rating, description } = newProduct;
    try{
      const checkProduct = await Product.findOne({ name: name });
      console.log(checkProduct)
      if(checkProduct){
        resolve({
          status: 'Error to create user',
          message: 'Product already exists',
        });
      };
      const newProduct = await Product.create({
        name, image, type, countInStock, price, rating, description
      });
      console.log(newProduct)
      if(newProduct){
        resolve({
          status: 'OK',
          message: 'Create Product Success',
          data: newProduct
        })
      }
    }
    catch(err){
      reject(err);
    }
  });
};

const updateProduct = async ( productId,data) => {
  return new Promise(async (resolve, reject) => {
    try{
      const checkProduct = await Product.findOne({ _id: productId });
      if(!checkProduct){
        resolve({
          status: 'Error',
          message: 'Product is not defined.',
        });
      };
      const updateProduct = await Product.findByIdAndUpdate(productId, data, {new: true});
      resolve({
        status: 'OK',
        message: 'Create Product Success',
        data: updateProduct
      })
    }
    catch(err){
      reject(err);
    }
  });
};

const getProductDetails = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id
      });
      if(!product){
        resolve({
          status: 'Error',
          message: 'The product is not defined.'
        });
      }

      resolve({
        status: 'Success',
        message: 'Get Detail Successfully.',
        data: product
      })
    }
    catch(error) {

    }
  })
};

module.exports = {
  createProduct,
  updateProduct,
  getProductDetails
}