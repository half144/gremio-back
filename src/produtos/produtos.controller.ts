import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AvaliacaoDto } from './dto/avaliacao.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto, @Request() req: any) {
    if (!req.user.admin) {
      throw new UnauthorizedException({
        message: 'Você não tem permissão para criar produtos',
      });
    }

    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }

  @Post('avaliar/:id')
  avaliar(@Param('id') id: number, @Body() avaliacao: AvaliacaoDto) {
    return this.produtosService.avaliar(id, avaliacao);
  }
}
