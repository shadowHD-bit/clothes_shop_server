import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../core/users/dto/create-user.dto';
import { LoginUserDto } from '../core/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtTokenDto } from './dto/jwt-token.dto';


@ApiTags("Авторизация")
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: JwtTokenDto})
    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: JwtTokenDto})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
