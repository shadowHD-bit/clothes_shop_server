import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { LikeDatabaseModel } from './likes.model';

@Table({ tableName: 'product_likes' })
export class LikeProductUserDataModel extends Model<LikeProductUserDataModel> {
  @ApiProperty({example: '1', description: 'Идентификатор сущности корзина поравившихся товаров-товар'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '1', description: 'Идентификатор корзины понравившихся товаров пользователя'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => LikeDatabaseModel)
  likeId: number;

  @ApiProperty({example: '1', description: 'Идентификатор товара'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel

  @BelongsTo(() => LikeDatabaseModel)
  like: LikeDatabaseModel

}