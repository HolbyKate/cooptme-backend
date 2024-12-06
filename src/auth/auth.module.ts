import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
