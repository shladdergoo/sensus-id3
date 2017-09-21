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
            filename: "foo"
        },
    }
    let req: any = mockReq(request);
    let res: any = mockRes();

    beforeEach(() => {

        res.setHeader = sinon.stub();
        res.send = sinon.stub();
    });

    describe("readTags", () => {

        it("return result when it gets result", () => {

            id3TagServiceMock.ReadTags = sinon.stub().yields(new TagBag());

            let sut: ID3TagController = new ID3TagController(id3TagServiceMock);
            sut.readTags(req, res);

            expect((<sinon.SinonStub>id3TagServiceMock.ReadTags).callCount).to.equal(1);
            let response: any = (<sinon.SinonStub>res.send).getCall(0).args[0];
            expect(response.tags).to.not.be.null;
        });
    });
});