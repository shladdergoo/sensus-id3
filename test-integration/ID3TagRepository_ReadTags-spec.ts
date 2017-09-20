import "mocha";
import * as chai from "chai";

import ID3TagRepository from "../src/repository/ID3TagRepository";

import TagBag from "../src/model/TagBag";

const expect = chai.expect;

describe("ID3Repository", () => {

    describe("ReadTags", () => {

        it("should succeed", () => {

            let sut = new ID3TagRepository();

            let result = sut.ReadTagsSync("D:\\temp\\02 Drone Strike.mp3");

            expect(result).to.not.be.null;
        });
    });
});
