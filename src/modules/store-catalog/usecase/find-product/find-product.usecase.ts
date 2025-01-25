
import Id from '../../../@shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import ProductGateway from '../../gateway/product.gateway';
import { FindProductInputDto, FindProductOutputDto } from './find-product.dto';
export default class FindProductUseCase{
    constructor(private productRepository: ProductGateway){}

    async execute(findProductInputDto: FindProductInputDto): Promise<FindProductOutputDto>{
        const product = await this.productRepository.find(findProductInputDto.id);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}