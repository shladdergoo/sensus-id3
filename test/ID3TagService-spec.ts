import "mocha";
import "mocha-sinon";
import * as chai from "chai";
import * as sinon from "sinon";

import IFileSystem from "../src/interface/IFileSystem";
import IID3TagRepository from "../src/interface/IID3TagRepository";
import IID3TagService from "../src/interface/IID3TagService";
import ID3TagService from "../src/service/ID3TagService";

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
});
