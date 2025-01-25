import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import ProductRepository from '../../repository/product.repository';
import CheckStockUseCase from './check-stock.usecase';
const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description Product 1",
    purchasePrice: 100,
    stock: 10,
});

const mockProductRepository = ()=> {
    return{
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("Check stock usecase unit test",()=>{
    
    it("Should find product", async ()=>{
        const productRepository = mockProductRepository();
        const checkStockUseCase = new CheckStockUseCase(productRepository);
    
        const input = {
            productId: "1",
        }
    
        const response = await checkStockUseCase.execute(input);

        expect(productRepository.find).toBeCalled();
        expect(response.productId).toEqual("1");
        expect(response.stock).toEqual(10);
    });
})

