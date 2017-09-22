import TagBag from "../model/TagBag";

interface IID3TagRepository {

    readTags(file: Buffer, filename: string, callback: (err: Error, tags: TagBag) => void): void;
    readTagsPromise(file: Buffer, filename: string): Promise<TagBag>;
    readTagsSync(filename: string): TagBag;
    writeArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
