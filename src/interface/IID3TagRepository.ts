interface IID3TagRepository {
    ReadArtist(filename: string): string;
    WriteArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
