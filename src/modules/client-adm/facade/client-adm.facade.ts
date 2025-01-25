import ClientAdmFacadeInterface, { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClienFacadeOutputDto, FindClientFacadeInputDto } from './client-adm.facade.interface';
import UseCaseInterface from '../../@shared/usecase/use-case.inteface';
import FindClientUseCase from '../usecase/find-client/find-client.usecase';
import AddClientUseCase from '../usecase/add-client/add-client.usecase';

type ClientAdmFacadeProps = {
    findUseCase: UseCaseInterface,
    addUseCase: UseCaseInterface,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface{

    private _findUseCase: UseCaseInterface;
    private _addUseCase: UseCaseInterface;

    constructor(input: ClientAdmFacadeProps) {
        this._addUseCase = input.addUseCase;
        this._findUseCase = input.findUseCase;
    }
    async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
        return await this._addUseCase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClienFacadeOutputDto> {
       return await this._findUseCase.execute(input);
    }
    
}