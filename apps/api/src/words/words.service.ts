import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Word, Prisma } from '@repo/database';

@Injectable()
export class WordsService {
    constructor(private readonly prisma: PrismaService) {}

    async word(
        wordWhereUniqueInput: Prisma.WordWhereUniqueInput,
    ): Promise<Word | null> {
        return this.prisma.word.findUnique({
            where: wordWhereUniqueInput,
        });
    }

    async words(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.WordWhereUniqueInput;
        where?: Prisma.WordWhereInput;
        orderBy?: Prisma.WordOrderByWithRelationInput;
    }): Promise<Word[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.word.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createWord(data: Prisma.WordCreateInput): Promise<Word> {
        return this.prisma.word.create({
            data,
        });
    }

    async updateWord(params: {
        where: Prisma.WordWhereUniqueInput;
        data: Prisma.WordUpdateInput;
    }): Promise<Word> {
        const { where, data } = params;
        return this.prisma.word.update({
            data,
            where,
        });
    }

    async deleteWord(where: Prisma.WordWhereUniqueInput): Promise<Word> {
        return this.prisma.word.delete({
            where,
        });
    }

    async findAll(filters?: { word?: string; translation?: string; partOfSpeech?: string }) {
        return this.prisma.word.findMany({
            where: {
                ...(filters?.word && { word: { contains: filters.word } }),
                ...(filters?.translation && { translation: { contains: filters.translation } }),
                ...(filters?.partOfSpeech && { partOfSpeech: filters.partOfSpeech }),
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.word.findUnique({
            where: { id },
        });
    }
}
