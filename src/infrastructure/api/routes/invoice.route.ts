import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const invoiceFacade = InvoiceFacadeFactory.create();
  const output = await invoiceFacade.findInvoice({id: req.params.id});

  res.format({
    json: async () => res.send(output)
  });
});