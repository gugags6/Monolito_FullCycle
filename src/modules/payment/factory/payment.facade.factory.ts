import ProcessPaymentUseCase from "../usecase/process-payment.usecase";
import TransactionRepository from '../repository/transaction.repository';
import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
      const repository = new TransactionRepository();
      const usecase = new ProcessPaymentUseCase(repository);
      const facade = new PaymentFacade(usecase);
      return facade;
    }
  }