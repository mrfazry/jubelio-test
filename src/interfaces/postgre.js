const postgres = require("postgres");
const dotenv = require("dotenv");
const Product = require("../entities/product");

dotenv.config();
//PGHOST=localhost
// PGUSERNAME=postgres
// PGDATABASE=postgres
// PGPASSWORD=postgres1234jubelio
// PGPORT=5432
const sql = postgres({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
});

module.exports = class {
  constructor() {
    this.sql = sql;
  }

  async persist(product) {
    await this.sql`
      insert into products (
        name, sku, image_url, description, price
      ) values (
        ${product.name}, ${product.sku}, ${product.imageURL}, ${product.description}, ${product.price}
      )
    `;
  }

  async find() {
    const products = await this.sql`
      select * from products
    `;

    return products;
  }

  async merge(productId, product) {
    // update record by id
  }

  async delete(productId) {
    // remove record by id
  }
};
