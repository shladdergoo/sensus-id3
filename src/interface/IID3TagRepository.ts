interface IID3TagRepository {
    WriteArtist(filename: string, artistValue: string): boolean;
}

export default IID3TagRepository;
