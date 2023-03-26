import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/core/users/users.service';
import { SocialVkAuthUserDto } from './dto/social-vk-user.dto';
import { SocialUserDataModel } from './vk-auth.model';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/core/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSocialVkAuthUserDto } from './dto/create-social-vk-user.dto';
import { BasketService } from 'src/core/basket/basket.service';
import { LikeService } from 'src/core/likes/likes.service';

@Injectable()
export class VkAuthService {
  constructor(
    @InjectModel(SocialUserDataModel)
    private SocialUserRepository: typeof SocialUserDataModel,
    private userService: UsersService,
    private authService: AuthService,
    private basketService: BasketService,
    private likeService: LikeService
  ) {}

  async authorizationAndRegistrationUser(dto: SocialVkAuthUserDto) {
    const candidate = await SocialUserDataModel.findOne({
      where: { idSocial: dto.idSocial },
    });

    if (candidate) {
      const user = await User.findOne({
        where: { id: candidate.userId },
      });
      return this.authService.generateToken(user);
    }
    
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const userDataRegistration = { ...dto, password: hashPassword, isVkAccount:true };
    delete userDataRegistration.idSocial;

    const user = await this.userService.createUser(userDataRegistration);
    await this.createSocialVkUser({idSocial: dto.idSocial, userId: user.id})

    await this.basketService.createBasket({ userId: user.id})
    await this.likeService.createLike({ userId: user.id})
    
    return this.authService.generateToken(user);
  }

  async createSocialVkUser(dto: CreateSocialVkAuthUserDto){
    await this.SocialUserRepository.create(dto);
  }
}
