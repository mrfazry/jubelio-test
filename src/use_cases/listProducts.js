function listProducts({ productRepo }) {
  return productRepo.find();
}

module.exports = listProducts;
