interface IFileSystem {
    GetDirectoryFilesSync(directory: string): string[];
}

export default IFileSystem;
