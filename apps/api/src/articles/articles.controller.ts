import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query('difficulty') difficulty?: string
  ) {
    return this.articlesService.findAll({ title, difficulty });
  }
}