import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from '../../dto/jwt-token.dto';
import { SocialVkAuthUserDto } from './dto/social-vk-user.dto';
import { VkAuthService } from './vk-auth.service';

@ApiTags("Авторизация")
@Controller('api/auth')
export class VkAuthController {

    constructor(private vkAuthService: VkAuthService) {}

    @ApiOperation({summary: "Регистрация и авторизация пользователя через соц.сеть Vk"})
    @ApiResponse({status: 200, type: JwtTokenDto})
    @Post("/social-auth/vk-auth")
    create(@Body() socialVkAuthUserDto: SocialVkAuthUserDto) {
      return this.vkAuthService.authorizationAndRegistrationUser(socialVkAuthUserDto);
    }

}
