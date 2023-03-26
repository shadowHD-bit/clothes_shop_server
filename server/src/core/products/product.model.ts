import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductBadgeDatabaseModel } from './product-badges/product-badge.model';
import { ProductBrandDatabaseModel } from './product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from './product-types/product-type.model';
import { ProductParamsDatabaseModel } from './product-params/product-params.model';
import { HistoryViewProductsDataModel } from '../history/history-view-product/history-view-product.model';
import { ReviewDatabaseModel } from '../reviews/review.model';
import { QuestionDatabaseModel } from '../qa/questions/question.model';
import { BasketProductUserDataModel } from '../basket/models/basket-product.model';
import { LikeProductUserDataModel } from '../likes/models/like-products.model';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';

interface ProductAttributes {
  name: string;
  price: number;
  rating: number;
  imgMain: string;
  imgAdditionallyFirst: string;
  imgAdditionallySecond: string;
  imgAdditionallyThird: string;
  description: string;
  isDisplay: boolean;
  productTypeId: number;
  productBrandId: number;
  productBadgeId: number;
}

@Table({ tableName: 'products' })
export class ProductDatabaseModel extends Model<
  ProductDatabaseModel,
  ProductAttributes
> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Adidas Pro Length 7X',
    description: 'Наименования товара',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @ApiProperty({ example: '10999', description: 'Цена товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  price: number;

  @ApiProperty({
    example: 'sdv929ds-sd9b29sb-sdb8sb-dsb818sd.png',
    description: 'Основная фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgMain: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29dsb-sdb8sb-dsb818sd.png',
    description: 'Первая дополнительная фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgAdditionallyFirst: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29dsb-sdb8sb-dsb818sd.png',
    description: 'Вторая дополнительная фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgAdditionallySecond: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29dsb-sdb8sb-dsb818sd.png',
    description: 'Третья дополнительная фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgAdditionallyThird: string;

  @ApiProperty({
    example: 'Самые новые модели обуви у нас на сайте...',
    description: 'Описание товара',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Параметр отображения товара на странице магазина',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  isDisplay: boolean;

  @ApiProperty({ example: '1', description: 'Идентификатор типа' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductTypeDatabaseModel)
  productTypeId: number;

  @BelongsTo(() => ProductTypeDatabaseModel)
  type: ProductTypeDatabaseModel;

  @ApiProperty({ example: '2', description: 'Идентификатор бренда' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductBrandDatabaseModel)
  productBrandId: number;

  @BelongsTo(() => ProductBrandDatabaseModel)
  brand: ProductBrandDatabaseModel;

  @ApiProperty({ example: '3', description: 'Идентификатор баджа' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  @ForeignKey(() => ProductBadgeDatabaseModel)
  productBadgeId: number;

  @BelongsTo(() => ProductBadgeDatabaseModel)
  badge: ProductBadgeDatabaseModel;

  @HasMany(() => ProductParamsDatabaseModel)
  params: ProductParamsDatabaseModel;

  @HasMany(() => HistoryViewProductsDataModel)
  history: HistoryViewProductsDataModel;

  @HasMany(() => ReviewDatabaseModel)
  review: ReviewDatabaseModel;

  @HasMany(() => QuestionDatabaseModel)
  question: QuestionDatabaseModel;

  @HasMany(() => BasketProductUserDataModel)
  basket_product: BasketProductUserDataModel;

  @HasMany(() => LikeProductUserDataModel)
  like_product: LikeProductUserDataModel;

  @HasMany(() => OrderProductUserDataModel)
  order_product: OrderProductUserDataModel;

  @HasMany(() => ProductSizeDatabaseModel)
  size_product: ProductSizeDatabaseModel;
}
