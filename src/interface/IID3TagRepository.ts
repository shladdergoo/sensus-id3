import TagBag from "../model/TagBag";

interface IID3TagRepository {

    readTags(file: Buffer, filename: string, callback: (err: Error, tags: TagBag) => void): void;
    readTagsSync(filename: string): TagBag;
    writeArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
