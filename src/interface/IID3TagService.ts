import TagBag from "../model/TagBag";

interface IID3TagService {
    ReadTags(filename: string): TagBag;
    ReadArtist(filename: string): string;
    WriteTags(filename: string, tags: TagBag): boolean;
    WriteArtist(filename: string, artistValue: string): boolean;
    ReadTagsDirectory(directory: string): TagBag[];
    WriteArtistDirectory(directory: string, artistValue: string): boolean;
}

export default IID3TagService;
