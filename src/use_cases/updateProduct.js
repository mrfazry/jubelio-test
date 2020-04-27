const Product = require("../entities/product");

function updateProduct(id, dataToUpdate, { productRepo }) {
  const name = dataToUpdate.name;
  const sku = dataToUpdate.sku;
  const image_url = dataToUpdate.image_url;
  const description = dataToUpdate.description;
  const price = dataToUpdate.price;

  const product = new Product(name, sku, image_url, description, price);

  return productRepo.merge(id, product);
}

module.exports = updateProduct;
