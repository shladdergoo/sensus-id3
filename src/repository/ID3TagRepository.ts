import { injectable } from "inversify";
import "reflect-metadata";

import IID3TagRepository from "../interface/IID3TagRepository";

import Tag from "../model/Tag";
import TagBag from "../model/TagBag";

@injectable()
class ID3TagRepository implements IID3TagRepository {

    private static BuildTagBag(filename: string, tags: any): TagBag {

        let tagBag = new TagBag();
        tagBag.filename = filename;
        tagBag.tags = new Array<Tag>();

        Object.keys(tags).forEach(name => {

            let tagValue: string;
            tagValue = tags[name];
            if (typeof(tagValue) === "string") {

                let tag = new Tag();
                tag.tagName = name;
                tag.tagValue = tags[name];
                tagBag.tags.push(tag);
            }
        });

        return tagBag;
    }

    private _nodeId3: any;

    public constructor() {

        this._nodeId3 = require("node-id3");
    }

    // tslint:disable-next-line:no-empty
    public ReadTags(file: Buffer, filename: string, callback: (err: Error, tags: TagBag) => void): void {
    }

    public ReadTagsSync(filename: string): TagBag {

        let tags;
        try {
            tags = this._nodeId3.read(filename);
        } catch (error) {
            return null;
        }

        return ID3TagRepository.BuildTagBag(filename, tags);
    }

    public ReadArtist(filename: string): string {

        let tags;
        try {
            tags = this._nodeId3.read(filename);
        } catch (error) {
            return null;
        }

        return tags.artist;
    }

    public WriteArtist(filename: string, artistValue: string): boolean {

        let tags = {
            artist: artistValue
        };

        let result = this._nodeId3.write(tags, filename);
        if (result === true) {
            return result;
        }

        return false;
    }
}

export default ID3TagRepository;
