import TagBag from "../model/TagBag";

interface IID3TagService {
    ReadTags(filename: string, callback: (response: TagBag) => void): void;
    WriteTags(filename: string, tags: TagBag): boolean;
    WriteArtist(filename: string, artistValue: string): boolean;
    ReadTagsDirectory(directory: string, fileExtension: string, callback: (response: TagBag[]) => void): void;
    ReadTagsDirectorySync(directory: string): TagBag[];
    WriteArtistDirectory(directory: string, artistValue: string): boolean;
}

export default IID3TagService;
