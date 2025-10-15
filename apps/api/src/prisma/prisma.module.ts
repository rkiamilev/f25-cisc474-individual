import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Global() // Only PrismaService should be global since it's infrastructure
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}