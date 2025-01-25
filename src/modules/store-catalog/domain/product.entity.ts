import BaseEntity from '../../@shared/domain/entity/base.entity';
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.inteface';
import Id from '../../@shared/domain/value-object/id.value-object';

type ProductProps={
    id: Id;
    name: string;
    description: string;
    salesPrice: number;
}

export default class Product extends BaseEntity implements AggregateRoot{
    
    private _name: string;
    private _description: string;
    private _salesPrice: number;
    constructor(productProps: ProductProps){
        super(productProps.id);
        this._name =  productProps.name;
        this._description = productProps.description;
        this._salesPrice = productProps.salesPrice;
    }


    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    get salesPrice(): number{
        return this._salesPrice;
    }
}