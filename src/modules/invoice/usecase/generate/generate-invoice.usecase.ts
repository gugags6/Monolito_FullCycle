import UseCaseInterface from "../../../@shared/usecase/use-case.inteface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import Invoice from '../../domain/entity/invoice';
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoide.dto';
import Address from "../../domain/value-object/address.value-object";
import Product from '../../domain/entity/product';
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUseCase implements UseCaseInterface{

    private _invoiceRepository: InvoiceGateway
    constructor(invoiceRepository: InvoiceGateway) 
    {
        this._invoiceRepository = invoiceRepository;
    }
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            id: new Id(input.id) || new Id(),
            name : input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            items: input.items.map(i=> new Product({
                id: new Id(i.id),
                name: i.name,
                price: i.price
            }))

        })

        await this._invoiceRepository.generate(invoice);
        
        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            city: invoice.address.city,
            items: invoice.items.map((inv) => ({
                id: inv.id.id,
                name: inv.name,
                price: inv.price,
            })),
            total: invoice.total()   
        }
    }

}

