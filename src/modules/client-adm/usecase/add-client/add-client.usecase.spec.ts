import AddClientUseCase from './add-client.usecase';
const mockRepository = () =>{
  return{
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe("Add client usecase unit test", () =>{

    it("Should add a new client", async () =>{
        
        const clientRepository =  mockRepository();

        const addClientUseCase = new AddClientUseCase(clientRepository);
    
        const input = {
            name: "Client 1",
            email: "xx@gmil.com",
            document: "0000",
            street:  "My Street",
            number:  "132",
            complement:  "aaaaa",
            city:  "New York",
            state:  "Kingston",
            zipCode:  "12401",
        }
        var result = await addClientUseCase.execute(input);
    
        expect(clientRepository.add).toHaveBeenCalled();
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
    });
});