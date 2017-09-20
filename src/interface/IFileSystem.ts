interface IFileSystem {

    GetDirectoryFiles(directory: string,
        fileExtension: string,
        callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    GetDirectoryFilesSync(directory: string): string[];
    ReadFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
}

export default IFileSystem;
