interface IFileSystem {

    GetDirectoryFiles(directory: string, callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    GetDirectoryFilesSync(directory: string): string[];
}

export default IFileSystem;
