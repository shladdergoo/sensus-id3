/* tslint:disable:no-unused-variable */
import * as express from "express";

import { inject, injectable } from "inversify";
import { Controller, Get, Post, Put, interfaces } from "inversify-express-utils";
import "reflect-metadata";

import IID3TagService from "../interface/IID3TagService";

import DirectoryResult from "../model/DirectoryResult";
import TagBag from "../model/TagBag";
import TagResult from "../model/TagResult";

import Types from "../types";

// http://127.0.0.1:3000/api/v1/id3tag/
@Controller("/id3tag")
@injectable()
export class ID3TagController implements interfaces.Controller {

    private _id3TagService: IID3TagService;

    constructor( @inject(Types.IID3TagService) id3TagService: IID3TagService) {
        this._id3TagService = id3TagService;
    }

    @Get("/")
    public index(req: express.Request, res: express.Response) {

        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ version: "0.0.1" }));
    }

    @Put("/:filename/artist/:artistValue")
    public writeArtist(req: express.Request): TagResult {

        let result: boolean;

        result = this._id3TagService.WriteArtist(req.params.filename,
            req.params.artistValue);

        return { returnValue: null, success: result, tags: null };
    }

    // http://127.0.0.1:3000/api/v1/id3tag/C%3A%5Ctemp%5C02%20Drone%20Strike.mp3/tags
    @Get("/:filename/tags")
    public readTags(req: express.Request, res: express.Response) {

        this._id3TagService.ReadTags(req.params.filename, (readResult) => {

            let tagBags: TagBag[] = new Array<TagBag>();
            tagBags.push(readResult);
            let tagResult: TagResult = { returnValue: "", success: true, tags: tagBags };

            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(tagResult));
        });
    }

    // http://127.0.0.1:3000/api/v1/id3tag/C%3A%5Ctemp/mp3/tags
    @Get("/:directory/:extension/tags")
    public readTagsDirectory(req: express.Request, res: express.Response) {

        this._id3TagService.ReadTagsDirectory(req.params.directory, req.params.extension, (readResult) => {

            let tagResult: TagResult = { returnValue: "", success: true, tags: readResult };

            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(tagResult));
        });
    }
}

export default ID3TagController;
