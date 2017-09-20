import { injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";

import * as fs from "fs";

@injectable()
class FileSystem implements IFileSystem {

    public GetDirectoryFiles(directory: string,
        fileExtention: string,
        callback: (err: NodeJS.ErrnoException, files: string[]) => void): void {

        fs.readdir(directory, (err, files) => {

            callback(err, files.filter((value, index, array) => {

                    return (value.endsWith(fileExtention));
            }));
        });
    }

    public GetDirectoryFilesSync(directory: string): string[] {

        return fs.readdirSync(directory);
    }

    public ReadFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void {

        fs.readFile(filename, callback);
    }
}

export default FileSystem;
