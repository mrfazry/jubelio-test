const Product = require("../entities/product");

function createProduct(
  name,
  sku,
  image_url,
  description,
  price,
  { productRepo }
) {
  const product = new Product(name, sku, image_url, description, price);

  return productRepo.persist(product);
}

module.exports = createProduct;
