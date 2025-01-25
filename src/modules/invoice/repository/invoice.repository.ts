import Invoice from '../domain/entity/invoice';
import { InvoiceModel } from './invoice.model';
import InvoiceGateway from '../gateway/invoice.gateway';
import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../domain/entity/product';
import Address from '../domain/value-object/address.value-object';
import { ProductInvoiceModel } from './product-invoice.model';
export default class InvoiceRepository implements InvoiceGateway{
    async generate(entity: Invoice): Promise<void> {

        await InvoiceModel.create(
          {
            id: entity.id.id,
            name: entity.name,
            document: entity.document,
            street: entity.address.street,
            number: entity.address.number,
            complement: entity.address.complement,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            items: entity.items.map((item) => ({
              id: item.id.id,
              name: item.name,
              price: item.price,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            })),
          },
          {
            include: [{ model: ProductInvoiceModel }],
          }
        );
    }

    async find(id: string): Promise<Invoice> {
      const result = await InvoiceModel.findOne({
        where: {id: id},
        include: ["items"],
      });

      const items = result.items.map((item)=>{
        return new Product({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt : item.updatedAt,
        })
      })

      const _address = new Address({
        street: result.street,
        number: result.number,
        complement: result.complement,
        city: result.city,
        state: result.state,
        zipCode: result.zipCode,
      })
      const invoice = new Invoice({
        id: new Id(result.id),
        name:  result.name,
        document:  result.document,
        address: _address,
        items: items,
    });

    return invoice;

    }
  }
