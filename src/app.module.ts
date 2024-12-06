import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { Profile } from './profiles/profile.entity';
import { Category } from './categories/category.entity';
import { NotificationsGateway } from './notifications/notifications.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Profile, Category],
        synchronize: true, // do not use in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    LinkedinModule,
  ],
  providers: [NotificationsGateway],
})
export class AppModule {}
