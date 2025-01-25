import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/entity/invoice';
import Address from '../../domain/value-object/address.value-object';
import Product from '../../domain/entity/product';
import GenerateInvoiceUseCase from './generate-invoice.usecase';

const productOne = new Product({
    id : new Id("1"),
    name: "Product 1",
    price: 500
});

const productTwo = new Product({
    id : new Id("2"),
    name: "Product 2",
    price: 750
});

const address = new Address({
    street: "street 1",
    number: "123",
    complement: "Next to drugstore",
    city: "City 1",
    state: "SO",
    zipCode: "123654987"
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "1234567890",
    address: address,
    items: [productOne,productTwo]
});

const mockInvoiceRepository = () =>{
    return{
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find: jest.fn(),
    }
}
describe("Invoice use case unit test", () =>{
    it("should generate a invoice", async () =>{

        const invoiceRepository = mockInvoiceRepository();
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: [
                {
                    id: productOne.id.id,
                    name: productOne.name,
                    price: productOne.price,  
                },
                {
                    id: productTwo.id.id,
                    name: productTwo.name,
                    price: productTwo.price,  
                },
            ]
        }

        var response = await useCase.execute(input);

        expect(invoiceRepository.generate).toBeCalled()
        expect(response.id).toBeDefined;
        expect(response.name).toEqual(input.name);
        expect(response.city).toEqual(input.city);
        expect(response.complement).toEqual(input.complement);
        expect(response.document).toEqual(input.document);
        expect(response.number).toEqual(input.number);
        expect(response.state).toEqual(input.state);
        expect(response.street).toEqual(input.street);
        expect(response.total).toBe(1250);

        expect(response.items.length).toBe(2);
        expect(response.items[0].id).toEqual("1");
        expect(response.items[0].name).toEqual("Product 1");
        expect(response.items[0].price).toBe(500);

        expect(response.items[1].id).toEqual("2");
        expect(response.items[1].name).toEqual("Product 2");
        expect(response.items[1].price).toBe(750);
    })
});

