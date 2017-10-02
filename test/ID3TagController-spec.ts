import * as chai from "chai";
import "mocha";
import "mocha-sinon";
import * as sinon from "sinon";
import { mockReq, mockRes } from "sinon-express-mock";

import ID3TagController from "../src/controller/ID3TagController";
import IID3TagService from "../src/service/ID3TagService";

import TagBag from "../src/model/TagBag";

const expect = chai.expect;

describe("ID3TagController", () => {

    let id3TagServiceMock: IID3TagService = <IID3TagService>{};

    const request = {
        params: {
            filename: "foo",
            directory: "bar"
        },
    }
    let req: any = mockReq(request);
    let res: any = mockRes();

    beforeEach(() => {

        res.setHeader = sinon.stub();
        res.send = sinon.stub();
    });

    describe("index", () => {

        it("returns result", () => {

            let sut: ID3TagController = new ID3TagController(id3TagServiceMock);
            sut.index(req, res);

            let response: any = (<sinon.SinonStub>res.send).getCall(0).args[0];
            expect(response).to.not.be.null;
        });
    });

    describe("readTags", () => {

        it("returns result when it gets result", () => {

            let tagBags: TagBag[] = new Array<TagBag>();
            tagBags.push(new TagBag());

            id3TagServiceMock.readTagsPromise = sinon.stub().returns(Promise.resolve(tagBags));

            let sut: ID3TagController = new ID3TagController(id3TagServiceMock);
            sut.readTags(req, res);

            expect((<sinon.SinonStub>id3TagServiceMock.readTagsPromise).callCount).to.equal(1);
            // let response: any = (<sinon.SinonStub>res.send).getCall(0).args[0];
            // expect(response.tags).to.not.be.null;
        });
    });

    describe("readTagsDirectory", () => {

        it("returns result when it gets result", () => {

            let tagBags: TagBag[] = new Array<TagBag>();
            tagBags.push(new TagBag());

            id3TagServiceMock.readTagsDirectory = sinon.stub().yields(tagBags);

            let sut: ID3TagController = new ID3TagController(id3TagServiceMock);
            sut.readTagsDirectory(req, res);

            expect((<sinon.SinonStub>id3TagServiceMock.readTagsDirectory).callCount).to.equal(1);
            let response: any = (<sinon.SinonStub>res.send).getCall(0).args[0];
            expect(response.tags).to.not.be.null;
        });
    });
});
