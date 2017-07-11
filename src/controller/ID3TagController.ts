/* tslint:disable:no-unused-variable */
import * as express from "express";

import { inject, injectable } from "inversify";
import { Controller, Get, interfaces } from "inversify-express-utils";
import "reflect-metadata";

import IID3TagService from "../interface/IID3TagService";
import Types from "../types";

@Controller("/id3tag")
@injectable()
export class ID3TagController implements interfaces.Controller {

    private _id3TagService: IID3TagService;

    constructor( @inject(Types.IID3TagService) id3TagService: IID3TagService) {
        this._id3TagService = id3TagService;
    }

    @Get("/")
    public index(req: express.Request): boolean {
        return this._id3TagService.WriteArtist("foo", "bar");
    }
}

export default ID3TagController;
