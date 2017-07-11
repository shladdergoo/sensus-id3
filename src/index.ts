import * as debug from "debug";

import App from "./app";

debug("ts-express:server");

const server = new App();
server.Listen(3000);
