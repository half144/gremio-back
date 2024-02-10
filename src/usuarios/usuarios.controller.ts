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
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.register(createUsuarioDto);
  }

  @Post('login')
  login(@Body() user: any) {
    return this.usuariosService.login(user.email, user.senha);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Post('carrinho')
  addProductToCart(@Body() data, @Request() req: any) {
    return this.usuariosService.addProductToCart(data.productId, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('favoritos')
  addProductToFavorites(@Body() data, @Request() req: any) {
    return this.usuariosService.addProductToFavorites(data.productId, req.user);
  }
}
