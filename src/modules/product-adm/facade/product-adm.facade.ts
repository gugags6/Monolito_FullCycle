import UseCaseInterface from "../../@shared/usecase/use-case.inteface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, AddProductFacadeOutputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
  }

export default class ProductAdmFacade implements ProductAdmFacadeInterface{
    
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;
    
    constructor(usecasesProps: UseCasesProps) {
        this._addUsecase = usecasesProps.addUseCase;
        this._checkStockUsecase = usecasesProps.stockUseCase;
      }

    async addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto> {
         return await this._addUsecase.execute(input);
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return await this._checkStockUsecase.execute(input);
    }

}