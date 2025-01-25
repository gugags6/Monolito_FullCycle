import Id from '../../../@shared/domain/value-object/id.value-object';
export interface FindAllProductdOutputDto{
    products: {
        id: Id;
        name: string,
        description: string,
        salesPrice: number
    }[];
}