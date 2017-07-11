import "mocha";
import "mocha-sinon";
import * as chai from "chai";
import * as sinon from "sinon";

import * as express from "express";

import ID3TagController from "../src/controller/ID3TagController";
import IID3TagService from "../src/interface/IID3TagService";

const expect = chai.expect;


describe("ID3TagController", () => {

    let serviceMock: IID3TagService = <IID3TagService>{};

    describe("index", () => {

        it("should call ID3TagService", () => {

            serviceMock.WriteArtist = sinon.stub()
            let requestMock = <express.Request><any>(sinon.stub());

            let sut: ID3TagController = new ID3TagController(serviceMock);
            
            sut.index(requestMock);

            expect((<sinon.SinonStub>serviceMock.WriteArtist).calledOnce).to.be.true;
        });
    });
});
