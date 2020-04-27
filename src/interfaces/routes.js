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

      if (!products.length) {
        const externalProducts = await getProductsFromExternalProvider();

        externalProducts.map(
          async ({ name, sku, image_url, description, price }) => {
            await createProduct(name, sku, image_url, description, price, {
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
    path: "/products/{id}",
    handler: async (request, h) => {
      const productId = request.params.id;
      const dataToUpdate = request.payload;

      try {
        await updateProduct(productId, dataToUpdate, {
          productRepo,
        });

        return h.response().code(204);
      } catch (err) {
        const payload = JSON.stringify({
          data: null,
          error: {
            name: "UpdateError",
            code: 001,
            message: `Cannot update the record of product #${productId}.\n${err}`,
          },
        });

        return h.response(payload).code(400);
      }
    },
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    handler: async (request, h) => {
      const productId = request.params.id;
      try {
        await deleteProduct(productId, { productRepo });

        return h.response().code(204);
      } catch (err) {
        const payload = JSON.stringify({
          data: null,
          error: {
            name: "DeleteError",
            code: 002,
            message: `Cannot delete the record of product #${productId}.\n${err}`,
          },
        });

        return h.response(payload).code(400);
      }
    },
  },
];
