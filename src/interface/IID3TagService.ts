import TagBag from "../model/TagBag";

interface IID3TagService {
    readTags(filename: string, callback: (response: TagBag) => void): void;
    readTagsPromise(filename: string): Promise<TagBag>;
    writeTags(filename: string, tags: TagBag): boolean;
    writeArtist(filename: string, artistValue: string): boolean;
    readTagsDirectory(directory: string, fileExtension: string, callback: (response: TagBag[]) => void): void;
    readTagsDirectorySync(directory: string): TagBag[];
    writeArtistDirectory(directory: string, artistValue: string): boolean;
}

export default IID3TagService;
