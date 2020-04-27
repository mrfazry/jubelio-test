const postgres = require("postgres");
const dotenv = require("dotenv");

dotenv.config();
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
        ${product.name}, ${product.sku}, ${product.image_url}, ${product.description}, ${product.price}
      )
    `;
  }

  async find() {
    const products = await this.sql`
      select * from products
      order by id asc
    `;

    return products;
  }

  async merge(productId, product) {
    let columnToUpdate = [];

    Object.keys(product).forEach((field) => {
      product[field] !== undefined && columnToUpdate.push(field);
    });

    try {
      await this.sql`
        update products set ${this.sql(product, ...columnToUpdate)}
        where
          id = ${productId}
      `;
    } catch (err) {
      throw err;
    }
  }

  async remove(productId) {
    try {
      await this.sql`
        delete from products
        where id = ${productId}
      `;
    } catch (err) {
      throw err;
    }
  }
};
