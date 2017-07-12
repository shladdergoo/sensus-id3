/* tslint:disable:no-unused-variable */
import * as express from "express";

import { inject, injectable } from "inversify";
import { Controller, Get, Post, Put, interfaces } from "inversify-express-utils";
import "reflect-metadata";

import IID3TagService from "../interface/IID3TagService";
import TagResult from "../model/TagResult";
import Types from "../types";

@Controller("/id3tag")
@injectable()
export class ID3TagController implements interfaces.Controller {

    private _id3TagService: IID3TagService;

    constructor( @inject(Types.IID3TagService) id3TagService: IID3TagService) {
        this._id3TagService = id3TagService;
    }

    @Get("/")
    public index(req: express.Request): string {
        return "v0.0.1";
    }

    @Put("/:filename/artist/:artistValue")
    public writeArtist(req: express.Request): TagResult {

        let result: boolean;

        result = this._id3TagService.WriteArtist(req.params.filename,
            req.params.artistValue);

        return { returnValue: null, success: result };
    }

    @Get("/:filename/artist/")
    public readArtist(req: express.Request): TagResult {

        let result: string;

        result = this._id3TagService.ReadArtist(req.params.filename);

        let success = !(result === null);

        return { returnValue: result, success: success };
    }
}

export default ID3TagController;
