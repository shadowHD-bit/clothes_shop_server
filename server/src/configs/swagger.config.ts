import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Интернет-магазин одежды')
.setDescription('Документация REST API')
.setVersion('1.0.0')
.addTag('Created: Alexandr Krivikov')
.build();
