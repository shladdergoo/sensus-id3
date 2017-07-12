import { injectable } from "inversify";
import "reflect-metadata";

import IFileSystem from "../interface/IFileSystem";

@injectable()
class FileSystem implements IFileSystem {

    public GetDirectoryFiles(directory: string): string[] {

        return null;
    }
}

export default FileSystem;
