const Product = require("../entities/product");

function updateProduct(
  id,
  name,
  sku,
  imageURL,
  description,
  price,
  { productRepo }
) {
  const product = new Product(name, sku, imageURL, description, price);

  return productRepo.merge(id, product);
}

module.exports = updateProduct;
