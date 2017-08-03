import { injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";

import * as fs from "fs";

@injectable()
class FileSystem implements IFileSystem {

    public GetDirectoryFiles(directory: string): string[] {

        return fs.readdirSync(directory);
    }
}

export default FileSystem;
