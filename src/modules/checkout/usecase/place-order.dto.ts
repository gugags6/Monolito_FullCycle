
export class PlaceOrderInputDto{
    clientId: string;
    products:{
        productId: string
    }[];
}

export  class PlaceOrderOutputDto{
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products:{
        productId:string;
    }[];
}