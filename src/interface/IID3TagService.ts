interface IID3TagService {
    ReadArtist(filename: string): string;
    WriteArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagService;
