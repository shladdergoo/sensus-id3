/* tslint:disable:no-unused-variable */
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IID3TagRepository from "../interface/IID3TagRepository";
import IID3TagService from "../interface/IID3TagService";
import Types from "../types";

@injectable()
class ID3TagService implements IID3TagService {

    private _id3TagRepository: IID3TagRepository;

    constructor( @inject(Types.IID3TagRepository) id3TagRepository: IID3TagRepository) {

        this._id3TagRepository = id3TagRepository;
    }

    public WriteArtist(filename: string, artistValue: string): boolean {

        return this._id3TagRepository.WriteArtist(filename, artistValue);
    }
}

export default ID3TagService;
