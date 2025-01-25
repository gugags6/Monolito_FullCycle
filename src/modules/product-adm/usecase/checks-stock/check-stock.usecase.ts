import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto';
import ProductGateway from '../../gateway/product.gateway';
export default class CheckStockUseCase{
    
    private repository: ProductGateway;
    
    constructor(repository: ProductGateway){
        this.repository = repository;
    }

    async execute(input:CheckStockInputDto): Promise<CheckStockOutputDto>{

        const product = await this.repository.find(input.productId);
        return {
            productId: product.id.id,
            stock: product.stock,
        };
    }

}