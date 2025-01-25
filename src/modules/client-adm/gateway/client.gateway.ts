import Client from '../domain/client-adm.entity';
export default interface ClientGateway{
    add(client: Client): Promise<void>;
    find(clientId: string): Promise<Client>
}