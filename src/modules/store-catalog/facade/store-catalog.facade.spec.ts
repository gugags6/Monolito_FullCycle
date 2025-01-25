import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from '../factory/facade.factory';
import { ProductCatalogModel } from '../repository/product.model';

describe("StoreCatalog test",()=>{
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

    it("Should find a product", async () =>{
        const facade = StoreCatalogFacadeFactory.create();

        await ProductCatalogModel.create({
            id: "1",
            name: "Product 1",
            description: "Description product 1",
            salesPrice: 200
        });

       const product = await facade.find({id: "1"});

        expect(product.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Description product 1");
        expect(product.salesPrice).toEqual(200);
    
    });

    it("Should find all products", async () =>{
        const facade = StoreCatalogFacadeFactory.create();
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
    

        const result =  await facade.findAll();
    
        expect(result.products.length).toBe(2);
    
        expect(result.products[0].id).toEqual("1");
        expect(result.products[0].name).toEqual("Product 1");
        expect(result.products[0].description).toEqual("Description product 1");
        expect(result.products[0].salesPrice).toEqual(200);
    
        expect(result.products[1].id).toEqual("2");
        expect(result.products[1].name).toEqual("Product 2");
        expect(result.products[1].description).toEqual("Description product 2");
        expect(result.products[1].salesPrice).toEqual(500);
    
    });
})