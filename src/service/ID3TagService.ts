/* tslint:disable:align */
import { inject, injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";
import IID3TagRepository from "../interface/IID3TagRepository";
import IID3TagService from "../interface/IID3TagService";

import TagBag from "../model/TagBag";

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

    public ReadTags(filename: string): TagBag {

        return this._id3TagRepository.ReadTags(filename);
    }

    public ReadArtist(filename: string): string {

        return this._id3TagRepository.ReadArtist(filename);
    }

    public ReadTagsDirectory(directory: string): TagBag[] {

        let files: string[];
        files = this._fileSystem.GetDirectoryFiles(directory);

        if (files === null || files.length === 0) {
            return null;
        }

        return this.GetFilesTags(files);
    }

    public ReadArtistDirectory(directory: string): string[] {

        return null;
    }

    public WriteTags(filename: string, tags: TagBag): boolean {

        return false;
    }

    public WriteArtist(filename: string, artistValue: string): boolean {

        return this._id3TagRepository.WriteArtist(filename, artistValue);
    }

    public WriteArtistDirectory(directory: string, artistValue: string): boolean {

        return null;
    }

    private GetFilesTags(files: string[]): TagBag[] {

        let tagBag = new Array<TagBag>();

        files.forEach(file => {

            let tags = this._id3TagRepository.ReadTags(file);
            // if (tags !== null) {
                tagBag.push(tags);
            // }
        });

        return tagBag;
    }
}

export default ID3TagService;
