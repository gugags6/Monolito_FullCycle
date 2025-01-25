import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice";
import Product from "../../domain/entity/product";
import Address from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from './find-invoice.usecase';

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
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    };
}

describe("Find invoice use case unit test",() => {
    it("should find a invoice", async ()=>{
        const invoiceRepository = mockInvoiceRepository();
        const useCase = new FindInvoiceUseCase(invoiceRepository);

        const response = await useCase.execute({ id: "1"});

        expect(invoiceRepository.find).toBeCalled()
        expect(response.id).toBeDefined;
        expect(response.name).toEqual(invoice.name);
        expect(response.address.city).toEqual(invoice.address.city);
        expect(response.address.complement).toEqual(invoice.address.complement);
        expect(response.document).toEqual(invoice.document);
        expect(response.address.number).toEqual(invoice.address.number);
        expect(response.address.state).toEqual(invoice.address.state);
        expect(response.address.street).toEqual(invoice.address.street);
        expect(response.total).toBe(1250);

        expect(response.items.length).toBe(2);
        expect(response.items[0].id).toEqual("1");
        expect(response.items[0].name).toEqual("Product 1");
        expect(response.items[0].price).toBe(500);

        expect(response.items[1].id).toEqual("2");
        expect(response.items[1].name).toEqual("Product 2");
        expect(response.items[1].price).toBe(750);

    });
});