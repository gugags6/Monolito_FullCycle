import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import StoreCatalogFacadeFactory from '../factory/facade.factory';
import { ProductCatalogModel } from "./product.model";


describe("Product repository test",  () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
          });
      
          await sequelize.addModels([ProductCatalogModel]);
          await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find all products", async () =>{
        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Description product 1",
            salesPrice: 200
        });
    
        await ProductCatalogModel.create({
            id: "2",
            name: "Product 2",
            description: "Description product 2",
            salesPrice: 500
        });
    
        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();
    
        expect(products.length).toBe(2);
    
        expect(products[0].id.id).toEqual("1");
        expect(products[0].name).toEqual("Product 1");
        expect(products[0].description).toEqual("Description product 1");
        expect(products[0].salesPrice).toEqual(200);
    
        expect(products[1].id.id).toEqual("2");
        expect(products[1].name).toEqual("Product 2");
        expect(products[1].description).toEqual("Description product 2");
        expect(products[1].salesPrice).toEqual(500);
    });

    it("Should find a product", async () =>{

        const facade = StoreCatalogFacadeFactory.create();

        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Description product 1",
            salesPrice: 200
        });

        const result = await facade.find({id: "1"});

        expect(result.id).toEqual("1");
        expect(result.name).toEqual("Product 1");
        expect(result.description).toEqual("Description product 1");
        expect(result.salesPrice).toEqual(200);
    
    })
});