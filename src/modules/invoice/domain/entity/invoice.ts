import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "./product"
import Address from "../value-object/address.value-object"
import BaseEntity from '../../../@shared/domain/entity/base.entity';
import AggregateRoot from '../../../@shared/domain/entity/aggregate-root.inteface';

type invoiceProps = {
    id?: Id // criado automaticamente
    name: string
    document: string
    address: Address // value object
    items: Product[] // Product entity
    createdAt?: Date // criada automaticamente
    updatedAt?: Date // criada automaticamente
}

export default class Invoice extends BaseEntity implements AggregateRoot{

    private _name: string
    private _document: string
    private _address: Address // value object
    private _items: Product[] // Product entity

    constructor(props: invoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string{
        return this._name;
    }

    get document() : string{
        return this._document;
    }

    get address() : Address{
        return this._address;
    }

    get items() : Product[]{
        return this._items;
    }

    total(): number{
        return this._items.reduce((accumulator, object) => {
            return accumulator + object.price;
          }, 0);
    }
}