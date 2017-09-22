import { inject, injectable } from "inversify";
import * as path from "path";
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

        this.GetFileTags(filename, (err, tags) => {

            callback(tags);
        });
    }

    public ReadTagsDirectory(directory: string, fileExtention: string, callback: (response: TagBag[]) => void): void {

        this._fileSystem.getDirectoryFiles(directory, fileExtention, (err, files) => {

            if (err) { throw err; }

            if (files === null || files.length === 0) {

                callback(null);
            } else {
                this.GetFilesTags(directory, files, (tagBags) => {

                    callback(tagBags);
                });
            }
        });
    }

    public ReadTagsDirectorySync(directory: string): TagBag[] {

        let files: string[];
        files = this._fileSystem.getDirectoryFilesSync(directory);

        if (files === null || files.length === 0) {
            return null;
        }

        return this.GetFilesTagsSync(files);
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

    private GetFilesTags(directory: string, files: string[], callback: (response: TagBag[]) => void): void {

        let tagBags = new Array<TagBag>();
        let targetBagsSize: number = files.length;

        files.forEach(filename => {

            this.GetDirectoryFileTags(directory, filename, (err, tagBag) => {

                if (err) {
                    targetBagsSize--;
                    if (tagBags.length === targetBagsSize) { callback(tagBags); }
                } else {
                    tagBags.push(tagBag);
                    if (tagBags.length === targetBagsSize) { callback(tagBags); }
                }
            });
        });
    }

    private GetFileTags(filename: string,
        callback: (err: NodeJS.ErrnoException, response: TagBag) => void): void {

        let parsedPath: path.ParsedPath = path.parse(filename);
        let dir: string = parsedPath.dir;
        let base: string = parsedPath.base;

        this.GetDirectoryFileTags(dir, base, callback);
    }

    private GetDirectoryFileTags(directory: string, fileShortName: string,
        callback: (err: NodeJS.ErrnoException, response: TagBag) => void): void {

        let fullFilename: string = path.join(directory, fileShortName);
        this._fileSystem.readFile(fullFilename, (readErr, data) => {

            if (!readErr && data !== null && data.length > 0) {

                this._id3TagRepository.ReadTags(data, fileShortName, (tagsErr, tags) => {

                    if (!tagsErr && tags !== null) {

                        callback(null, tags);
                    } else {
                        callback(new Error("Error reading tags"), null);
                    }
                });
            } else {
                callback(new Error("Error reading file"), null);
            }
        });
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
