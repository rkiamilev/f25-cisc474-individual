import { LinksModule } from './links/links.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [LinksModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
