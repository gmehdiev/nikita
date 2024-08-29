import { Module } from '@nestjs/common';
import { FakeService } from './fake.service';
import { FakeController } from './fake.controller';

@Module({
  providers: [FakeService],
  controllers: [FakeController],
})
export class FakeModule {}
