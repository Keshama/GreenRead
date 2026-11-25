import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(data: { id: string; title: string; author: string; year?: number; cover?: string }) {
    return this.prisma.book.create({ data });
  }

  findAll() {
    return this.prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Buku ${id} tidak ditemukan`);
    return book;
  }

  async update(
  id: string,
  data: { title?: string; author?: string; year?: number; cover?: string; bookmarked?: boolean },
) {
  await this.findOne(id);
  const { title, author, year, cover, bookmarked } = data;
  return this.prisma.book.update({
    where: { id },
    data: { title, author, year, cover, bookmarked },
  });
}

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
  // Filter: hanya buku yang di-bookmark
findBookmarked() {
  return this.prisma.book.findMany({ where: { bookmarked: true } });
}

// Statistik sederhana
async getStats() {
  const [total, bookmarked] = await Promise.all([
    this.prisma.book.count(),
    this.prisma.book.count({ where: { bookmarked: true } }),
  ]);
  return { total, bookmarked };
}
}