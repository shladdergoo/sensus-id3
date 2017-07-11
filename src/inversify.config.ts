import { Container } from "inversify";

import { Controller, TYPE, interfaces } from "inversify-express-utils";

import IID3TagRepository from "./interface/IID3TagRepository";
import IID3TagService from "./interface/IID3TagService";

import ID3TagController from "./controller/ID3TagController";
import ID3TagRepository from "./repository/ID3TagRepository";
import ID3TagService from "./service/ID3TagService";

import Types from "./types";

let container = new Container();

container.bind<IID3TagRepository>(Types.IID3TagRepository).to(ID3TagRepository);
container.bind<IID3TagService>(Types.IID3TagService).to(ID3TagService);
container.bind<interfaces.Controller>(TYPE.Controller).to(ID3TagController)
    .whenTargetNamed("ID3TagController");

export default container;
