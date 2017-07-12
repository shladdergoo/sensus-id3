import { injectable } from "inversify";
import "reflect-metadata";

import IID3TageRepository from "../interface/iid3TagRepository";

@injectable()
class ID3TagRepository implements IID3TageRepository {

    public ReadArtist(filename: string): string {

        let nodeId3 = require("node-id3");

        let tags;
        try {
            tags = nodeId3.read(filename);
        } catch (error) {
            return null;
        }

        return tags.artist;
    }

    public WriteArtist(filename: string, artistValue: string): boolean {

        let nodeId3 = require("node-id3");

        let tags = {
            artist: artistValue
        };

        let result = nodeId3.write(tags, filename);
        if (result === true) {
            return result;
        }

        return false;
    }
}

export default ID3TagRepository;
