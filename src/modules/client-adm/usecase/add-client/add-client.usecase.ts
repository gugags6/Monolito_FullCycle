import ClientGateway from '../../gateway/client.gateway';
import { AddClientUseCaseInputDto, AddClientUseCaseOutputDto } from './add-client.usecase.dto';
import Client from '../../domain/client-adm.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
export default class AddClientUseCase{
    private _clientRepository : ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(addClientUseCaseInputDto: AddClientUseCaseInputDto): Promise<AddClientUseCaseOutputDto>{

        const props = {
            id: new Id(addClientUseCaseInputDto.id) || new Id(),
            name: addClientUseCaseInputDto.name,
            email: addClientUseCaseInputDto.email,
            document: addClientUseCaseInputDto.document,
            street:  addClientUseCaseInputDto.street,
            number:  addClientUseCaseInputDto.number,
            complement:  addClientUseCaseInputDto.complement,
            city:  addClientUseCaseInputDto.city,
            state:  addClientUseCaseInputDto.state,
            zipCode:  addClientUseCaseInputDto.zipCode,
        }

        const client = new Client(props)

        await this._clientRepository.add(client)

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street:  client.street,
            number:  client.number,
            complement:  client.complement,
            city:  client.city,
            state:  client.state,
            zipCode:  client.zipCode,
            updatedAt: client.updatedAt,
            createdAt: client.createdAt
        }
    }
}