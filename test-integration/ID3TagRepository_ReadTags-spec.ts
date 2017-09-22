import * as chai from "chai";
import * as fs from "fs";
import "mocha";

import ID3TagRepository from "../src/repository/ID3TagRepository";

const expect = chai.expect;

describe("ID3Repository", () => {

    describe("ReadTags", () => {

        it("should succeed", (done) => {

            let filename: string = "C:\\temp\\02 Drone Strike.mp3";

            let buffer: Buffer = fs.readFileSync(filename);

            let sut = new ID3TagRepository();

            sut.readTags(buffer, filename, (err, tags) => {

                expect(tags).to.not.be.null;
                done();
            });
        });
    });
});
