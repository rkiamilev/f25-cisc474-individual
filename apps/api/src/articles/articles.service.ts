import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article, Prisma } from '@repo/database';

@Injectable()
export class ArticlesService {
    constructor(private readonly prisma: PrismaService) {}

    async article(
        articleWhereUniqueInput: Prisma.ArticleWhereUniqueInput,
    ): Promise<Article | null> {
        return this.prisma.article.findUnique({
            where: articleWhereUniqueInput,
        });
    }

    async articles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ArticleWhereUniqueInput;
        where?: Prisma.ArticleWhereInput;
        orderBy?: Prisma.ArticleOrderByWithRelationInput;
    }): Promise<Article[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.article.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
        return this.prisma.article.create({
            data,
        });
    }

    async updateArticle(params: {
        where: Prisma.ArticleWhereUniqueInput;
        data: Prisma.ArticleUpdateInput;
    }): Promise<Article> {
        const { where, data } = params;
        return this.prisma.article.update({
            data,
            where,
        });
    }

    async deleteArticle(where: Prisma.ArticleWhereUniqueInput): Promise<Article> {
        return this.prisma.article.delete({
            where,
        });
    }

    async findAll(filters?: { title?: string; difficulty?: string; content?: string }) {
        return this.prisma.article.findMany({
            where: {
                ...(filters?.title && { title: { contains: filters.title } }),
                ...(filters?.difficulty && { difficulty: filters.difficulty }),
                ...(filters?.content && { content: { contains: filters.content } }),
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.article.findUnique({
            where: { id },
        });
    }
}