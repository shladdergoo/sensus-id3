import * as chai from "chai";
import * as express from "express";
import "mocha";
import "mocha-sinon";
import * as sinon from "sinon";

import ID3TagController from "../src/controller/ID3TagController";
import IID3TagService from "../src/service/ID3TagService";

import TagBag from "../src/model/TagBag";
import TagResult from "../src/model/TagResult";

const expect = chai.expect;

describe("ID3TagController", () => {

    let id3TagServiceMock: IID3TagService = <IID3TagService>{};

    describe("readTags", () => {

        it("should return tags", (done) => {

            id3TagServiceMock.ReadTags = sinon.stub().yields(new TagBag());

            let sut: ID3TagController = new ID3TagController(id3TagServiceMock);
        });
    });
});