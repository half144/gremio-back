import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvaliacaoDto } from './dto/avaliacao.dto';
import { Produto } from './entities/produto';

@Injectable()
export class ProdutosService {
  constructor(@InjectModel(Produto.name) private produtos: Model<Produto>) {}

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const product = new this.produtos({
        ...createProdutoDto,
        unidadesRestantes: createProdutoDto.estoque,
      });
      await product.save();
      return product;
    } catch (error) {
      console.log('AQUIII');
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const produtos = await this.produtos.find();

      const productWithMedia = produtos.map((produto) => {
        const media = produto.avaliacoes.reduce(
          (acc, cur) => acc + cur.nota,
          0,
        );
        return {
          ...produto.toObject(),
          media: media / produto.avaliacoes.length,
        };
      });

      return productWithMedia;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.produtos.findById(id);

      const produtoWithMedia = {
        ...produto,
        media: produto.avaliacoes.reduce((acc, cur) => acc + cur.nota, 0),
      };

      return produtoWithMedia;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    try {
      const produto = await this.produtos.findByIdAndUpdate(
        id,
        updateProdutoDto,
        {
          new: true,
        },
      );
      return produto;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const produto = await this.produtos.findByIdAndDelete(id);
      return produto;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  avaliar(id: number, avaliacao: AvaliacaoDto) {
    if (avaliacao.nota < 0 || avaliacao.nota > 5) {
      throw new BadRequestException('Nota inválida');
    }

    try {
      const produto = this.produtos.findByIdAndUpdate(
        id,
        {
          $push: { avaliacoes: avaliacao },
        },
        {
          new: true,
        },
      );
      return produto;
    } catch (error) {}
  }
}
