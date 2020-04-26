"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./interfaces/routes");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["http://localhost:3000"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
