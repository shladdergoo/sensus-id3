import { injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";

import * as fs from "fs";

@injectable()
class FileSystem implements IFileSystem {

    public getDirectoryFiles(directory: string,
        fileExtention: string,
        callback: (err: NodeJS.ErrnoException, files: string[]) => void): void {

        fs.readdir(directory, (err, files) => {

            callback(err, files.filter((value, index, array) => {

                return (value.endsWith(fileExtention));
            }));
        });
    }

    public getDirectoryFilesSync(directory: string): string[] {

        return fs.readdirSync(directory);
    }

    public readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void {

        fs.readFile(filename, callback);
    }

    public readFilePromise(filename: string): Promise<any> {

        return new Promise((resolve, reject) => {

            fs.readFile(filename, (err, data) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export default FileSystem;
