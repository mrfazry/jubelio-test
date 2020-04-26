const Product = require("../entities/product");

function createProduct(
  name,
  sku,
  imageURL,
  description,
  price,
  { productRepo }
) {
  const product = new Product(name, sku, imageURL, description, price);

  return productRepo.persist(product);
}

module.exports = createProduct;
