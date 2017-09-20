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

    public ReadTags(filename: string, callback: (response: TagBag) => void): void {

        this._fileSystem.ReadFile(filename, (readErr, data) => {

            if (readErr) { throw readErr; }

            if (data == null || data.length === 0) { callback(null); }

            this._id3TagRepository.ReadTags(data, filename, (tagsErr, tags) => {

                callback(tags);
            });
        });
    }

    public ReadTagsDirectory(directory: string, callback: (response: TagBag[]) => void): void {

        this._fileSystem.GetDirectoryFiles(directory, (err, files) => {

            if (err) { throw err; }

            if (files === null || files.length === 0) {
                callback(null);
            } else {
                callback(this.GetFilesTags(files));
            }
        });
    }

    public ReadTagsDirectorySync(directory: string): TagBag[] {

        let files: string[];
        files = this._fileSystem.GetDirectoryFilesSync(directory);

        if (files === null || files.length === 0) {
            return null;
        }

        return this.GetFilesTagsSync(files);
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

        files.forEach(filename => {

            this._fileSystem.ReadFile(filename, (readErr, data) => {

                if (!readErr && data !== null && data.length > 0) {

                    this._id3TagRepository.ReadTags(data, filename, (tagsErr, tags) => {

                        if (!tagsErr && tags !== null) {
                            tagBag.push(tags);
                        }
                    });
                }
            });
        });

        return tagBag;
    }

    private GetFilesTagsSync(files: string[]): TagBag[] {

        let tagBag = new Array<TagBag>();

        files.forEach(file => {

            let tags = this._id3TagRepository.ReadTagsSync(file);
            if (tags !== null) {
                tagBag.push(tags);
            }
        });

        return tagBag;
    }
}

export default ID3TagService;
