function getProducts({ productRepo }) {
  return productRepo.find();
}

module.exports = getProducts;
