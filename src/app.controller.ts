import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHome(): string {
    return;
  }

  @Get('/room/:roomId')
  @Render('room')
  getRoom() {
    return;
  }
}
