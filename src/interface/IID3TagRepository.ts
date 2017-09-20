import TagBag from "../model/TagBag";

interface IID3TagRepository {

    ReadTags(file: Buffer, filename: string, callback: (err: Error, tags: TagBag) => void): void;
    ReadTagsSync(filename: string): TagBag;
    ReadArtist(filename: string): string;
    WriteArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
