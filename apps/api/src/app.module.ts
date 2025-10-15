import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    PrismaModule, 
    LinksModule, 
    UserModule, 
    ArticlesModule, 
    WordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
