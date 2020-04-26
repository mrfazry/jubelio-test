"use strict";

const dotenv = require("dotenv");
const postgres = require("postgres");

const init = async () => {
  dotenv.config();

  try {
    const sql = postgres();

    console.log("dropping table, if exists");
    await sql`DROP TABLE IF EXISTS products`;

    console.log("creating table...");

    await sql`CREATE TABLE IF NOT EXISTS products (
            id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name varchar(200) NOT NULL,
            sku varchar(50) NOT NULL,
            image_url varchar(150) NOT NULL,
            description varchar(200) NOT NULL,
            price integer NOT NULL
        )`;

    await sql.end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

init()
  .then(() => {
    console.log("init finished");
  })
  .catch(() => {
    console.log("init finished with errors");
  });
