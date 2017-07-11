import { injectable } from "inversify";
import "reflect-metadata";

import IID3TageRepository from "../interface/iid3TagRepository";

@injectable()
class ID3TagRepository implements IID3TageRepository {

    public WriteArtist(filename: string, artistValue: string): boolean {

        let nodeId3 = require("node-id3");

        let  tags = {
            artist: artistValue
        };

        let result = nodeId3.write(filename, tags);

        return result;
    }
}

export default ID3TagRepository;
