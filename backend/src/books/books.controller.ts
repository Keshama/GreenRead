import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() body: any) {
    return this.booksService.create(body);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  @Get('bookmarked')
findBookmarked() {
  return this.booksService.findBookmarked();
}

@Get('stats')
getStats() {
  return this.booksService.getStats();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
  
}