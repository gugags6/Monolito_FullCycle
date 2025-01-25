import FindProductUseCase from '../usecase/find-product/find-product.usecase';
import StoreCatalogFacadeInterface, { FindAllStoreCatalogOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from './store-catalog.facade.interface';
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase';


export interface UseCaseProps{
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{

    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;

    constructor(props: UseCaseProps){
        this._findAllUseCase = props.findAllUseCase;
        this._findUseCase = props.findUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
       const product = await this._findUseCase.execute(id);
       return product;
    }

    async findAll(): Promise<FindAllStoreCatalogOutputDto> {
        return await this._findAllUseCase.execute();
    }
    
}