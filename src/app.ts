import "reflect-metadata";

import { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";

import * as bodyParser from "body-parser";
import * as morgan from "morgan";

import ContainerConfig from "./inversify.config";

export class AppExpresss {

    private _application: Application;

    constructor() {

        let server = new InversifyExpressServer(ContainerConfig, null, { rootPath: "/api/v1" });

        server.setConfig((app) => {
            let logger = morgan("combined");
            app.use(logger);

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
        });

        this._application = server.build();
    }

    public Listen(port: number): void {
        this._application.listen(port);
    }
}

export default AppExpresss;
