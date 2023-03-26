import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './core/users/users.model';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './auth/auth.module';
import { VkAuthModule } from './auth/social-auth/vk-auth/vk-auth.module';
import { GoogleAuthModule } from './auth/social-auth/google-auth/google-auth.module';
import { SocialGoogleUserDataModel } from './auth/social-auth/google-auth/google-auth.model';
import { ResetPasswordDatabaseModel } from './auth/reset-psw/reset-psw.model';
import { MailModule } from './mail/mail.module';
import { ResetPasswordModule } from './auth/reset-psw/reset-psw.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationDatabaseModel } from './core/notification/notification.model';
import { NotificationModule } from './core/notification/notification.module';
import { ProductDatabaseModel } from './core/products/product.model';
import { ProductBadgeDatabaseModel } from './core/products/product-badges/product-badge.model';
import { ProductsModule } from './core/products/product.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ProductBadgeModule } from './core/products/product-badges/product-badge.module';
import { ProductBrandDatabaseModel } from './core/products/product-brands/product-brand.model';
import { ProductBrandsModule } from './core/products/product-brands/product-brand.module';
import { ProductTypesModule } from './core/products/product-types/product-type.module';
import { ProductTypeDatabaseModel } from './core/products/product-types/product-type.model';
import { ProductParamsDatabaseModel } from './core/products/product-params/product-params.model';
import { ProductParamsModule } from './core/products/product-params/product-params.module';
import { CouponsModule } from './core/coupons/coupon.module';
import { CouponDatabaseModel } from './core/coupons/coupon.model';
import { LocationDatabaseModel } from './core/location/location.model';
import { LocationsModule } from './core/location/location.module';
import { FaqDatabaseModel } from './core/faqs/faq.model';
import { FaqModule } from './core/faqs/faq.module';
import { SlideDatabaseModel } from './core/slides/slide.model';
import { SlideModule } from './core/slides/slide.module';
import { BasketDataModel } from './core/basket/models/basket.model';
import { BasketProductUserDataModel } from './core/basket/models/basket-product.model';
import { BasketModule } from './core/basket/basket.module';
import { HistoryViewProductsDataModel } from './core/history/history-view-product/history-view-product.model';
import { HistoryViewProductModule } from './core/history/history-view-product/history-view-product.module';
import { ReviewDatabaseModel } from './core/reviews/review.model';
import { ReviewModule } from './core/reviews/review.module';
import { AnswersDatabaseModel } from './core/qa/answers/answer.model';
import { QuestionDatabaseModel } from './core/qa/questions/question.model';
import { QuestionModule } from './core/qa/questions/question.module';
import { AnswerModule } from './core/qa/answers/answer.module';
import { LikeDatabaseModel } from './core/likes/models/likes.model';
import { LikeProductUserDataModel } from './core/likes/models/like-products.model';
import { LikeModule } from './core/likes/likes.module';
import { OrderDatabaseModel } from './core/orders/model/order.model';
import { OrderProductUserDataModel } from './core/orders/model/order-product.model';
import { OrderDetailsUserDatabaseModel } from './core/orders/model/order-details.model';
import { SizeDatabaseModel } from './core/sizes/models/size.model';
import { ProductSizeDatabaseModel } from './core/sizes/models/size-product.model';
import { SizeModule } from './core/sizes/size.module';
import { OrderModule } from './core/orders/order.module';
import { ExcelModule } from './core/excel/excel.module';
import { StatisticsModule } from './core/statistics/statistics.module';
import { PaymentModule } from './payment/payment.module';
import { SocialUserDataModel } from './auth/social-auth/vk-auth/vk-auth.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'slides'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'types'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'product'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'brands'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'reviews'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'src', 'static', 'avatars'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        SocialUserDataModel,
        SocialGoogleUserDataModel,
        ResetPasswordDatabaseModel,
        NotificationDatabaseModel,
        ProductDatabaseModel,
        ProductBadgeDatabaseModel,
        ProductBrandDatabaseModel,
        ProductTypeDatabaseModel,
        ProductParamsDatabaseModel,
        CouponDatabaseModel,
        LocationDatabaseModel,
        FaqDatabaseModel,
        SlideDatabaseModel,
        BasketDataModel,
        BasketProductUserDataModel,
        HistoryViewProductsDataModel,
        ReviewDatabaseModel,
        AnswersDatabaseModel,
        QuestionDatabaseModel,
        LikeDatabaseModel,
        LikeProductUserDataModel,
        OrderDatabaseModel,
        OrderProductUserDataModel,
        OrderDetailsUserDatabaseModel,
        SizeDatabaseModel,
        ProductSizeDatabaseModel,
      ],
      autoLoadModels: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    UsersModule,
    AuthModule,
    VkAuthModule,
    GoogleAuthModule,
    MailModule,
    ResetPasswordModule,
    NotificationModule,
    ProductsModule,
    FilesModule,
    ProductBadgeModule,
    ProductBrandsModule,
    ProductTypesModule,
    ProductParamsModule,
    CouponsModule,
    FaqModule,
    LocationsModule,
    SlideModule,
    BasketModule,
    HistoryViewProductModule,
    ReviewModule,
    QuestionModule,
    AnswerModule,
    LikeModule,
    SizeModule,
    OrderModule,
    ExcelModule,
    StatisticsModule,
    PaymentModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(errorHandlingMiddleware)
  //     .forRoutes({ path: 'api/*', method: RequestMethod.ALL });
  // }
}
