import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { SocialGoogleUserDataModel } from './google-auth.model';
import { CreateSocialGoogleAuthUserDto } from './dto/create-social-google-user.dto';
import { SocialGoogleAuthUserDto } from './dto/social-google-user.dto';
import { AuthService } from '../../auth.service';
import { BasketService } from '../../../core/basket/basket.service';
import { LikeService } from '../../../core/likes/likes.service';
import { User } from '../../../core/users/users.model';
import { UsersService } from '../../../core/users/users.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectModel(SocialGoogleUserDataModel)
    private SocialUserRepository: typeof SocialGoogleUserDataModel,
    private userService: UsersService,
    private authService: AuthService,
    private basketService: BasketService,
    private likeService: LikeService,
  ) {}

  async authorizationAndRegistrationUser(dto: SocialGoogleAuthUserDto) {
    const candidate = await SocialGoogleUserDataModel.findOne({
      where: { idSocial: dto.idSocial },
    });

    if (candidate) {
      const user = await User.findOne({
        where: { id: candidate.userId },
      });

      const isBanned = await this.userService.isBannedUserByEmail(user.email);
      if (isBanned) {
        throw new UnauthorizedException({
          message: isBanned.reason,
        });
      }

      return this.authService.generateToken(user);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const userDataRegistration = {
      ...dto,
      password: hashPassword,
      isGoogleAccount: true,
    };
    delete userDataRegistration.idSocial;

    const user = await this.userService.createUser(userDataRegistration);
    await this.createSocialVkUser({ idSocial: dto.idSocial, userId: user.id });

    await this.basketService.createBasket({ userId: user.id });
    await this.likeService.createLike({ userId: user.id });
    return this.authService.generateToken(user);
  }

  async createSocialVkUser(dto: CreateSocialGoogleAuthUserDto) {
    await this.SocialUserRepository.create(dto);
  }
}
