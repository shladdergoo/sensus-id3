interface IFileSystem {

    getDirectoryFiles(directory: string,
        fileExtension: string,
        callback: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    getDirectoryFilesSync(directory: string): string[];
    readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    readFilePromise(filename: string): Promise<any>;
}

export default IFileSystem;
