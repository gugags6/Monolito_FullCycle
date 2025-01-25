import productEntity from '../domain/product.entity';
import ProductGateway from '../gateway/product.gateway';
import { ProductModel } from './product.model';
import Id from '../../@shared/domain/value-object/id.value-object';
import Product from '../domain/product.entity';
export default class ProductRepository implements ProductGateway{
    async add(product: productEntity): Promise<void> {
      await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

    }
    async find(id: string): Promise<productEntity> {
      try {
    
        const productDb = await ProductModel.findOne({where: {id:id}})

        if (!productDb) {
         throw new Error(`Product with id ${id} not found`);
       }
 
       return new Product({
         id: new Id(productDb.id),
         name: productDb.name,
         description: productDb.description,
         purchasePrice: productDb.purchasePrice,
         stock: productDb.stock,
         createdAt: new Date(),
         updatedAt: new Date(),
       })
      } catch (error) {
        const r = error;
      }
      
    }
    
}