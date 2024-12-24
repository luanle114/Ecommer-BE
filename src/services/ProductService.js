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

const deleteProduct =  async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId
      })
      if(!checkProduct){
        resolve({
          status: 'Error',
          message: 'The product is not defined.'
        });
      }
      await Product.findByIdAndDelete(productId);
      resolve({
        status: 'Success',
        message: 'Delete Successfully.',
      })
    }
    catch(error){
      reject(error);
    }
  })
};

const getAllProducts =  async (page_size = 10, page_index = 0, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProducts = await Product.countDocuments();
      if(filter){
        const label = filter[0];
        const filterProducts = await Product.find({[label]: { '$regex': filter[1] }}).limit(page_size).skip(page_index * page_size);
        resolve({
          status: 'Success',
          message: 'Get All Products Successfully.',
          data: filterProducts,
          pagination: {
            totalProducts: totalProducts,
            page_size: Math.ceil(totalProducts / page_size),
            page_index: page_index + 1
          }
        })
      }
      if(sort){
        const obSort = {};
        obSort[sort[1]] = sort[0];
        const sortProducts = await Product.find().limit(page_size).skip(page_index * page_size).sort(obSort);
        resolve({
          status: 'Success',
          message: 'Get All Products Successfully.',
          data: sortProducts,
          pagination: {
            totalProducts: totalProducts,
            page_size: Math.ceil(totalProducts / page_size),
            page_index: page_index + 1
          }
        })
      }
      const products = await Product.find().limit(page_size).skip(page_index * page_size);
      resolve({
        status: 'Success',
        message: 'Get All Products Successfully.',
        data: products,
        pagination: {
          totalProducts: totalProducts,
          page_size: Math.ceil(totalProducts / page_size),
          page_index: page_index + 1
        }
      })
    }
    catch(error){
      reject(error);
    }
  })
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAllProducts,
}