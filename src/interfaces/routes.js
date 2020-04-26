const createProduct = require("../use_cases/createProduct");
const listProducts = require("../use_cases/listProducts");
const updateProduct = require("../use_cases/updateProduct");
const deleteProduct = require("../use_cases/deleteProduct");
const ProductRepo = require("../use_cases/productRepo");
const ProductRepoPostgre = require("./postgre");
const getProductsFromExternalProvider = require("./external");

const productRepo = new ProductRepo(new ProductRepoPostgre());

module.exports = [
  {
    method: "GET",
    path: "/products",
    handler: async (request, h) => {
      let products = await listProducts({ productRepo });
      console.log("GET /products setelah select database");
      console.log(products);

      if (!products.length) {
        const externalProducts = await getProductsFromExternalProvider();

        externalProducts.map(
          async ({ name, sku, imageURL, description, price }) => {
            await createProduct(name, sku, imageURL, description, price, {
              productRepo,
            });
          }
        );

        products = await listProducts({ productRepo });
      }

      return JSON.stringify({ data: products, error: null });
    },
  },
  {
    method: "PATCH",
    path: "/products",
    handler: async (request, h) => {
      console.log(request);
      const productId = 1;
      const name = "nama";
      const sku = "sku";
      const imageURL = "imageURL";
      const description = "deskripsi";
      const price = 10000;

      await updateProduct(productId, name, sku, imageURL, description, price, {
        productRepo,
      });

      return "PATCH /products";
    },
  },
  {
    method: "DELETE",
    path: "/products",
    handler: async (request, h) => {
      console.log(request);
      const productId = 1;

      await deleteProduct(productId, { productRepo });

      return "DELETE /products";
    },
  },
];
