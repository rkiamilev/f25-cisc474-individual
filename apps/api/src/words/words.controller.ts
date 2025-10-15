import { Controller, Get, Query } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async findAll(
    @Query('word') word?: string,
    @Query('translation') translation?: string
  ) {
    return this.wordsService.findAll({ word, translation });
  }
}
