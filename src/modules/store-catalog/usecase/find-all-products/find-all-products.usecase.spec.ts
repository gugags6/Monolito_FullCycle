import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const producOne = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 300,
})

const producTwo = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 600,
})

const mockProductRepository = ()=>{
    return{
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([producOne,producTwo])),
    }
}

describe("Store catalog find all usecase unit tests", ()=>{

    it("Should find all products", async()=>{

        const productRepository = mockProductRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);

        const response = await findAllProductsUseCase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();

        expect(response.products[0].id).toEqual(producOne.id.id);
        expect(response.products[0].name).toEqual(producOne.name);
        expect(response.products[0].description).toEqual(producOne.description);
        expect(response.products[0].salesPrice).toEqual(producOne.salesPrice);

        expect(response.products[1].id).toEqual(producTwo.id.id);
        expect(response.products[1].name).toEqual(producTwo.name);
        expect(response.products[1].description).toEqual(producTwo.description);
        expect(response.products[1].salesPrice).toEqual(producTwo.salesPrice);
    });
});