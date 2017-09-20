import "mocha";
import * as chai from "chai";

import FileSystem from "../src/repository/FileSystem";

const expect = chai.expect;

describe("FileSystem", () => {

    describe("GetDirectoryFilesSync", () => {

        it("should succeed", () => {

            let sut = new FileSystem();

            let result = sut.GetDirectoryFilesSync("C:\\temp");

            expect(result).to.not.be.undefined;
            expect(result).to.not.be.null;

            console.log(result);
        });
    });
    describe("GetDirectoryFiles", () => {

        it("should succeed", (done) => {

            let sut = new FileSystem();

            sut.GetDirectoryFiles("C:\\temp", "*.mp3", (err, files) => {

                expect(err).to.be.null;
                expect(files).to.not.be.null;
                expect(files.length).to.not.equal(0);

                done();
            });
        });
    });
});
