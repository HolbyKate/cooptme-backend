import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('linkedin')
@UseGuards(AuthGuard)
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Post('scan')
  async scanProfile(@Body() data: { profileUrl: string }) {
    return this.linkedinService.getProfileFromLinkedIn(data.profileUrl);
  }
}
