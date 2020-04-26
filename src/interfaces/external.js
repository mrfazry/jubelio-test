const axios = require("axios");
const dotenv = require("dotenv");
const convert = require("xml-js");

dotenv.config();

module.exports = function getProductsFromExternalProvider() {
  return axios.default
    .get("http://api.elevenia.co.id/rest/prodservices/product/listing", {
      headers: {
        "content-type": "application/xml",
        "accept-charset": "utf-8",
        openapikey: process.env.ELEVENIA_API_KEY,
      },
    })
    .then((res) => {
      const json = convert.xml2json(res.data, { compact: true });
      const products = JSON.parse(json).Products.product;

      return products.map((product) => ({
        name: product.prdNm._text,
        sku: product.sellerPrdCd._text,
        imageURL: "image url",
        description: "description",
        price: product.selPrc._text,
      }));
    })
    .catch((err) => {
      console.log(err);
    });
};
