import * as chai from "chai";
import "mocha";
import "mocha-sinon";
import * as sinon from "sinon";

import IFileSystem from "../src/interface/IFileSystem";
import IID3TagRepository from "../src/interface/IID3TagRepository";
import ID3TagService from "../src/service/ID3TagService";

import TagBag from "../src/model/TagBag";

const expect = chai.expect;

describe("ID3TagService", () => {

    let repositoryMock: IID3TagRepository = <IID3TagRepository>{};
    let fileSystemMock: IFileSystem = <IFileSystem>{};

    describe("ReadTags", () => {

        it("should return tags", (done) => {

            fileSystemMock.ReadFile = sinon.stub().yields(null, new Buffer(99));
            repositoryMock.ReadTags = sinon.stub().yields(null, new Array<TagBag>());

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTags("foo", (tags) => {

                expect(tags).to.not.be.null;
                done();
            });
        });
    });

    describe("ReadTagsDirectory", () => {

        it("should throw an exception if it receives an exception", (done) => {

            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(new Error("Foo"), null);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            expect(() => {

                sut.ReadTagsDirectory("foo", "*.*", (tags) => {
                });
            }).to.throw("Foo");

            done();
        });

        it("should return null when no files found (null)", (done) => {

            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(null, null);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTagsDirectory("foo", "*.*", (tags) => {

                expect(tags).to.be.null;
                done();
            });
        });

        it("should return null when no files found (empty)", (done) => {

            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(null, []);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTagsDirectory("foo", "*.*", (tags) => {

                expect(tags).to.be.null;
                done();
            });
        });

        it("should read files when files found", (done) => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(null, files);
            fileSystemMock.ReadFile = sinon.stub().yields(null, null);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTagsDirectory("foo", "*", (tags) => {

                expect((<sinon.SinonStub>fileSystemMock.ReadFile).callCount).to.equal(2);
                done();
            });
        });

        it("should get tags when files read", (done) => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(null, files);
            fileSystemMock.ReadFile = sinon.stub().yields(null, new Buffer(99));
            repositoryMock.ReadTags = sinon.stub().yields(null, new Array<TagBag>());

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTagsDirectory("foo", "*", (tags) => {

                expect((<sinon.SinonStub>repositoryMock.ReadTags).callCount).to.equal(2);
                done();
            });
        });

        it("should return tags when files read", (done) => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFiles = sinon.stub().yields(null, files);
            fileSystemMock.ReadFile = sinon.stub().yields(null, new Buffer(99));
            repositoryMock.ReadTags = sinon.stub().yields(null, new Array<TagBag>());

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.ReadTagsDirectory("foo", "*", (tags) => {

                expect(tags).to.not.be.null;
                expect(tags.length).to.equal(2);
                done();
            });
        });
    });

    describe("WriteArtist", () => {

        it("should call ID3TagRepository", () => {

            repositoryMock.WriteArtist = sinon.stub().returns(true);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            sut.WriteArtist("foo", "bar");

            expect((<sinon.SinonStub>repositoryMock.WriteArtist).calledOnce).to.be.true;
        });
    });

    describe("ReadTagsDirectorySync", () => {

        it("should return null when no files found (null)", () => {

            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns(null);

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
            repositoryMock.ReadTagsSync = sinon.stub().returns(new Array<TagBag>());

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect((<sinon.SinonStub>repositoryMock.ReadTagsSync).callCount).to.equal(2);
        });

        it("should return tags when files found", () => {

            let files = ["foo", "bar"];
            fileSystemMock.GetDirectoryFilesSync = sinon.stub().returns(files);
            let tags = new Array<TagBag>();
            repositoryMock.ReadTagsSync = sinon.stub().returns(tags);

            let sut: ID3TagService = new ID3TagService(repositoryMock, fileSystemMock);

            let result = sut.ReadTagsDirectorySync("foo");

            expect(result).to.not.be.null;
            expect(result.length).to.equal(2);
        });
    });
});
