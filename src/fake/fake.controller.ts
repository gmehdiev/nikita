import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { FakeService } from './fake.service';
import { Response } from 'express';

@Controller('fake')
export class FakeController {
  constructor(private readonly fakeService: FakeService) {}

  @Get()
  async getFakeData(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.fakeService.getFakeData(page, limit);
  }

  @Post()
  async fakeForm(@Body() dto: any, @Res() res: Response) {
    console.log(dto);
    res.sendStatus(HttpStatus.OK);
  }
}
