import "mocha";
import * as chai from "chai";

import FileSystem from "../src/repository/FileSystem";

const expect = chai.expect;

describe("FileSystem", () => {

    describe("GetDirectoryFiles", () => {

        it("should succeed", () => {

            let sut = new FileSystem();

            let result = sut.GetDirectoryFilesSync("D:\\temp");

            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;

            console.log(result);
        });
    });
});
