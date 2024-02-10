import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './entities/usuario.entity';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Produto } from 'src/produtos/entities/produto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Produto.name) private produto: Model<Produto>,
    @InjectModel(Usuario.name) private usuario: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

  async register(createUsuarioDto: CreateUsuarioDto) {
    console.log(createUsuarioDto);
    try {
      const user = new this.usuario(createUsuarioDto);
      await user.save();

      const { senha: _, ...userData } = user.toObject();
      const token = await this.jwtService.signAsync(userData);

      const returnUser = {
        ...user.toObject(),
        token,
      };
      return returnUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(email: string, senha: string) {
    try {
      const user = await this.usuario.findOne({ email });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      if (user.senha !== senha) {
        throw new Error('Senha incorreta');
      }

      const { senha: _, ...userData } = user.toObject();
      const token = await this.jwtService.signAsync(userData);

      const returnUser = {
        ...user.toObject(),
        token,
      };

      return returnUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const usuarios = await this.usuario.find();
      return usuarios;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProductToCart(id: number, user: any) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new BadRequestException('Id inválido');
      }

      const usuario = await this.usuario.findById(user._id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      const produto = await this.produto.findById(id);
      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      usuario.carrinho.push(id.toString());

      await usuario.save();
      return usuario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addProductToFavorites(id: number, user: any) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new BadRequestException('Id inválido');
      }

      const usuario = await this.usuario.findById(user._id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      const produto = await this.produto.findById(id);
      if (!produto) {
        throw new Error('Produto não encontrado');
      }

      usuario.favoritos.push(id.toString());

      await usuario.save();
      return usuario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
