import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { User } from 'src/core/users/users.model';
@Table({ tableName: 'history_view_products' })
export class HistoryViewProductsDataModel extends Model<HistoryViewProductsDataModel> {
  @ApiProperty({example: '1', description: 'Идентификатор корзины'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({example: '1', description: 'Идентификатор товара'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel

//   @HasMany(() => BasketProductUserDataModel)
//   basket: BasketProductUserDataModel
}