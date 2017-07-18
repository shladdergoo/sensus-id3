import TagBag from "../model/TagBag";

interface IID3TagRepository {
    ReadTags(filename: string): TagBag;
    ReadArtist(filename: string): string;
    WriteArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
