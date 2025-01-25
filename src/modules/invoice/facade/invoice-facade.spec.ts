import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import Product from "../domain/entity/product";
import Address from "../domain/value-object/address.value-object";
import { InvoiceModel } from "../repository/invoice.model";
import { ProductInvoiceModel } from "../repository/product-invoice.model";
import InvoiceFacadeFactory from '../factory/facade.factory';

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

const input = {
    id: "1",
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
    ],
}

describe("Test Invoice Facade",() =>{
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([
        InvoiceModel,
        ProductInvoiceModel,
      ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create()

        await invoiceFacade.generateInvoice(input);

        const result = await InvoiceModel.findOne({ where: { id: input.id }, include: ["items"] });
        const t = result.toJSON();
        expect(result.toJSON()).toStrictEqual({
          id: "1",
          name: "Invoice 1",
          document: "1234567890",
          street: "street 1",
          number: "123",
          complement: "Next to drugstore",
          city: "City 1",
          state: "SO",
          zipCode: "123654987",
          items: [
            {
              invoice_id: "1",
              id : productOne.id.id,
              name: "Product 1",
              price: 500,
            },
            {
              invoice_id: "1",
              id : productTwo.id.id,
              name: "Product 2",
              price: 750,
            }
          ],
        });
    });
    
    it("should find a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()

      await invoiceFacade.generateInvoice(input);

      const result = await invoiceFacade.findInvoice({id: "1"});
   
      expect(result.id).toEqual("1");
      expect(result.name).toEqual("Invoice 1");
      expect(result.document).toEqual("1234567890");
      expect(result.address.street).toEqual("street 1");
      expect(result.address.complement).toEqual("Next to drugstore");
      expect(result.address.number).toEqual("123");
      expect(result.address.city).toEqual("City 1");
      expect(result.address.state).toEqual("SO");
      expect(result.address.zipCode).toEqual("123654987");

      expect(result.items.length).toBe(2);

      expect(result.items[0].id).toEqual("1");
      expect(result.items[0].name).toEqual("Product 1");
      expect(result.items[0].price).toEqual(500);

      expect(result.items[1].id).toEqual("2");
      expect(result.items[1].name).toEqual("Product 2");
      expect(result.items[1].price).toEqual(750);

      expect(result.total).toBe(1250);
    });
})