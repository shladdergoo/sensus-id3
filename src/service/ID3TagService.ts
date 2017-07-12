/* tslint:disable:align */
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";
import IID3TagRepository from "../interface/IID3TagRepository";
import IID3TagService from "../interface/IID3TagService";

import Types from "../types";

@injectable()
class ID3TagService implements IID3TagService {

    private _id3TagRepository: IID3TagRepository;
    private _fileSystem: IFileSystem;

    constructor( @inject(Types.IID3TagRepository) id3TagRepository: IID3TagRepository,
        @inject(Types.IFileSystem) fileSystem: IFileSystem) {

        this._id3TagRepository = id3TagRepository;
        this._fileSystem = fileSystem;
    }

    public ReadArtist(filename: string): string {

        return this._id3TagRepository.ReadArtist(filename);
    }

    public ReadArtistDirectory(directory: string): string[] {

        return null;
    }

    public WriteArtist(filename: string, artistValue: string): boolean {

        return this._id3TagRepository.WriteArtist(filename, artistValue);
    }

    public WriteArtistDirectory(directory: string, artistValue: string): boolean {

        return null;
    }
}

export default ID3TagService;
