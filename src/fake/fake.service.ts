import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeService {
  private generateFakeData() {
    return {
      id: faker.number.int(),
      word: faker.word.adverb(),
      lorem: faker.lorem.words(12),
    };
  }

  getFakeData(page: number, limit: number) {
    const total = 100;
    const data = Array.from({ length: limit }, (_, i) =>
      this.generateFakeData(),
    );
    return { data, total, page, limit };
  }
}
