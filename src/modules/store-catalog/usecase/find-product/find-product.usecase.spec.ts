import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from './find-product.usecase';

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description Product 1",
    salesPrice: 250
})

const mockRepository = () =>{
    return{
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}



describe("Test find product use case", ()=>{
    it("Should find a product", async()=>{
        const productRepository = mockRepository();
        const findUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        }
        const product = await findUseCase.execute(input)

        expect(productRepository.find).toHaveBeenCalled();
        expect(product.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Description Product 1");
        expect(product.salesPrice).toEqual(250);
    })
})