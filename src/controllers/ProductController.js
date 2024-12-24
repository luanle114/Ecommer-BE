const ProductService = require("../services/ProductService")

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating } = req.body;
    if(!name || !image || !type || !price || !countInStock || !rating){
      return res.status(400).json({
        status: 'Error to create produt',
        message: 'Please fill in all fields',
      });
    }
    const respsonse = await ProductService.createProduct(req.body);
    return res.status(200).json(respsonse);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if(!productId){
      return res.status(400).json({
        status: 'Error to update product.',
        message: 'This product id is required.'
      })
    }

    const response = await ProductService.updateProduct(productId, req.body);
    return res.status(200).json(response);
  }
  catch(error){
    return res.status(404).json({
      message: error.message,
    })
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    if(!productId){
      return res.status(400).json({
        status: 'Error',
        message: 'The product is required.'
      });
    }

    const response = await ProductService.getProductDetails(productId);
    return res.status(200).json(response)
  }
  catch(error) {
    return res.status(404).json({
      message: error
    })
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if(!productId){
      return res.status(400).json({
        status: 'Error',
        message: 'The product is required.'
      });
    }

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response)
  }
  catch(error) {
    return res.status(404).json({
      message: error
    })
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page_size, page_index, sort, filter } = req.query;
    const response = await ProductService.getAllProducts(Number(page_size), Number(page_index), sort, filter );
    return res.status(200).json(response)
  }
  catch(error) {
    return res.status(404).json({
      message: error
    })
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAllProducts,
};