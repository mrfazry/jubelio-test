function deleteProduct(productId, { productRepo }) {
  return productRepo.remove(productId);
}

module.exports = deleteProduct;
