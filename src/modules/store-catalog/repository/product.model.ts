import { AllowNull, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    tableName: "productsCatalog",
    timestamps: false,
})

export class ProductCatalogModel extends Model{

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
  
    @Column({ allowNull: false })
    name: string;
  
    @Column({ allowNull: false })
    description: string;
  
    @Column({ allowNull: false })
    salesPrice: number;
}

