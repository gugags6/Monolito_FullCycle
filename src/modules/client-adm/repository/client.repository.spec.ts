import { Sequelize } from 'sequelize-typescript';
import Id from '../../@shared/domain/value-object/id.value-object';
import ClientModel from './client.model';
import ClientRepository from './client.repository';
import Client from '../domain/client-adm.entity';
describe("Client repository unit test",()=>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
          });
      
          await sequelize.addModels([ClientModel]);
          await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a product", async () =>{

        const clientRepository = new ClientRepository();

        const input = {
            id: "1",
            name: "Client 1",
            email: "xx@gmil.com",
            document: "0000",
            street:  "My Street",
            number:  "132",
            complement:  "aaaaa",
            city:  "New York",
            state:  "Kingston",
            zipCode:  "12401",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        await ClientModel.create(input);

        const result = await clientRepository.find("1");

        expect(result.id.id).toBeDefined();
        expect(result.name).toEqual("Client 1");
        expect(result.document).toEqual("0000");
        expect(result.street).toEqual("My Street");
        expect(result.number).toEqual("132");
        expect(result.complement).toEqual("aaaaa");
        expect(result.city).toEqual("New York");
        expect(result.state).toEqual("Kingston");
        expect(result.zipCode).toEqual("12401");
        expect(result.email).toEqual("xx@gmil.com");
        expect(result.createdAt.getTime()).toEqual(input.createdAt);
        expect(result.updatedAt.getTime()).toEqual(input.updatedAt);
    });

    it("Should create a client", async() =>{
        const clientRepository = new ClientRepository();

        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "xx@gmil.com",
            document: "0000",
            street:  "My Street",
            number:  "132",
            complement:  "aaaaa",
            city:  "New York",
            state:  "Kingston",
            zipCode:  "12401",
        });

        await clientRepository.add(client);

        const result = await ClientModel.findOne({where:{id: "1"}});

        expect(result.id).toBeDefined();
        expect(result.name).toEqual("Client 1");
        expect(result.document).toEqual("0000");
        expect(result.street).toEqual("My Street");
        expect(result.number).toEqual("132");
        expect(result.complement).toEqual("aaaaa");
        expect(result.city).toEqual("New York");
        expect(result.state).toEqual("Kingston");
        expect(result.zipCode).toEqual("12401");
        expect(result.email).toEqual("xx@gmil.com");
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);

    })
});