import { AllowNull, BelongsToMany, NotNull } from 'sequelize-typescript';
import {
    Table,
    Model,
    PrimaryKey,
    Column,
    BelongsTo,
  } from "sequelize-typescript";
import { InvoiceModel } from './invoice.model';
import Invoice from '../domain/entity/invoice';

  
  @Table({
    tableName: "productsInvoice",
    timestamps: false,
  })
  export class ProductInvoiceModel extends Model {
    @PrimaryKey
    @Column
    declare  id: string;
    @Column({ allowNull: false })
    declare  name: string;
    @Column({ allowNull: false })
    declare  price: number;
    @BelongsTo(() => InvoiceModel,{ foreignKey: 'invoice_id'})
    Invoice: InvoiceModel[];
  }