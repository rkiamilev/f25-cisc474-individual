import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
