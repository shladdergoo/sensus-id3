import "mocha";
import "mocha-sinon";
import * as chai from "chai";
import * as sinon from "sinon";

import IFileSystem from "../src/interface/IFileSystem";
import IID3TagRepository from "../src/interface/IID3TagRepository";
import IID3TagService from "../src/interface/IID3TagService";
import ID3TagService from "../src/service/ID3TagService";

import TagBag from "../src/model/TagBag";

const expect = chai.expect;

describe("ID3TagService", () => {

    let repositoryMock: IID3TagRepository = <IID3TagRepository>{};
    let fileSystemMock: IFileSystem = <IFileSystem>{};

    describe("WriteArtist", () => {

        it("should call ID3TagRepository", () => {

            repositoryMock.WriteArtist = sinon.stub().returns(true);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.WriteArtist("foo", "bar");

            expect((<sinon.SinonStub>repositoryMock.WriteArtist).calledOnce).to.be.true;
        });
    });

    describe("ReadTagsDirectory", () => {

        it("should return null when no files found (null)", () => {

            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns(null)

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect(result).to.be.null;
        });

        it("should return null when no files found (empty)", () => {

            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns([]);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect(result).to.be.null;
        });

        it("should get tags when files found", () => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns(files);
            repositoryMock.ReadTags = sinon.stub().returns(new Array<TagBag>());

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect((<sinon.SinonStub>repositoryMock.ReadTags).callCount).to.equal(2);
        });

        it("should return tags when files found", () => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns(files);
            let tags = new Array<TagBag>();
            repositoryMock.ReadTags = sinon.stub().returns(tags);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect(result).to.not.be.null;
            expect(result.length).to.equal(2);
        });
    });
});
