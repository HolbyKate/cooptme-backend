import { Module } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { LinkedinController } from './linkedin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profiles/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [LinkedinService],
  controllers: [LinkedinController],
  exports: [LinkedinService],
})
export class LinkedinModule {}