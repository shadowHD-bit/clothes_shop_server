import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from '../../dto/jwt-token.dto';
import { SocialGoogleAuthUserDto } from './dto/social-google-user.dto';
import { GoogleAuthService } from './google-auth.service';

@ApiTags("Авторизация")
@Controller('api/auth')
export class GoogleAuthController {

    constructor(private googleAuthService: GoogleAuthService) {}

    @ApiOperation({summary: "Регистрация и авторизация пользователя через сервис Google"})
    @ApiResponse({status: 200, type: JwtTokenDto})
    @Post("/social-auth/google-auth")
    create(@Body() socialGoogleAuthUserDto: SocialGoogleAuthUserDto) {
      return this.googleAuthService.authorizationAndRegistrationUser(socialGoogleAuthUserDto);
    }

}
