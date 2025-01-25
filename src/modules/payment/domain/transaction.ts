import BaseEntity from '../../@shared/domain/entity/base.entity';
import AggregateRoot from '../../@shared/domain/entity/aggregate-root.inteface';
import Id from '../../@shared/domain/value-object/id.value-object';
type TransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Transaction extends BaseEntity implements AggregateRoot{
    
    private _amount: number;
    private _orderId: string;
    private _status: string;
    constructor(transactionProps: TransactionProps) {
        super(transactionProps.id, transactionProps.createdAt, transactionProps.updatedAt);
        this._amount = transactionProps.amount;
        this._orderId = transactionProps.orderId;
        this._status = transactionProps.status || "pending";
        this.validate();
    }

    validate(): void{
        if(this._amount <= 0)
            throw new Error("Amount must be greater than 0");
    }

    approve(): void{
        this._status = "approved";
    }

    declide(): void{
        this._status = "decline";
    }

    process(): void{
        if(this._amount >= 100)
        {
            this.approve();
            return;
        }
        this.declide();
    }

    get amount(): number {
        return this._amount;
      }
    
      get orderId(): string {
        return this._orderId;
      }
    
      get status(): string {
        return this._status;
      }
}