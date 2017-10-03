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

    public readTags(filename: string, callback: (response: TagBag) => void): void {

        this.getFileTags(filename, (err, tags) => {

            callback(tags);
        });
    }

    public readTagsPromise(filename: string): Promise<TagBag> {

        return this.getFileTagsPromise(filename);
    }

    public async readTagsAsync(filename: string): Promise<TagBag> {

        return await this.getFileTagsAsync(filename);
    }

    public readTagsDirectory(directory: string, fileExtention: string, callback: (response: TagBag[]) => void): void {

        this._fileSystem.getDirectoryFiles(directory, fileExtention, (err, files) => {

            if (err) { throw err; }

            if (files === null || files.length === 0) {

                callback(null);
            } else {
                this.getFilesTags(directory, files, (tagBags) => {

                    callback(tagBags);
                });
            }
        });
    }

    public readTagsDirectorySync(directory: string): TagBag[] {

        let files: string[];
        files = this._fileSystem.getDirectoryFilesSync(directory);

        if (files === null || files.length === 0) {
            return null;
        }

        return this.getFilesTagsSync(files);
    }

    public writeTags(filename: string, tags: TagBag): boolean {

        return false;
    }

    public writeArtist(filename: string, artistValue: string): boolean {

        return this._id3TagRepository.writeArtist(filename, artistValue);
    }

    public writeArtistDirectory(directory: string, artistValue: string): boolean {

        return null;
    }

    private getFilesTags(directory: string, files: string[], callback: (response: TagBag[]) => void): void {

        let tagBags = new Array<TagBag>();
        let targetBagsSize: number = files.length;

        files.forEach(filename => {

            this.getDirectoryFileTags(directory, filename, (err, tagBag) => {

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

    private getFileTagsPromise(filename: string): Promise<TagBag> {

        return this._fileSystem.readFilePromise(filename)
            .then((buffer) => {

                return this._id3TagRepository.readTagsPromise(buffer, filename);
            });
    }

    private async getFileTagsAsync(filename: string): Promise<TagBag> {

        let buffer: Buffer = await this._fileSystem.readFilePromise(filename);

        return await this._id3TagRepository.readTagsPromise(buffer, filename);
    }

    private getFileTags(filename: string,
        callback: (err: NodeJS.ErrnoException, response: TagBag) => void): void {

        let parsedPath: path.ParsedPath = path.parse(filename);
        let dir: string = parsedPath.dir;
        let base: string = parsedPath.base;

        this.getDirectoryFileTags(dir, base, callback);
    }

    private getDirectoryFileTags(directory: string, fileShortName: string,
        callback: (err: NodeJS.ErrnoException, response: TagBag) => void): void {

        let fullFilename: string = path.join(directory, fileShortName);
        this._fileSystem.readFile(fullFilename, (readErr, data) => {

            if (!readErr && data !== null && data.length > 0) {

                this._id3TagRepository.readTags(data, fileShortName, (tagsErr, tags) => {

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

    private getFilesTagsSync(files: string[]): TagBag[] {

        let tagBag = new Array<TagBag>();

        files.forEach(file => {

            let tags = this._id3TagRepository.readTagsSync(file);
            if (tags !== null) {
                tagBag.push(tags);
            }
        });

        return tagBag;
    }
}

export default ID3TagService;
