import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'src/app/validator/auth/auth.dto';
import { Request, Response, response } from 'express';
import { verify } from 'argon2';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { getAuthCookie } from 'src/utils/auth/get-auth-cookie';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async fetchCurrentUser(@Req() req: Request) {
    const cookie = getAuthCookie(req);
    const data = await this.jwtService.verifyAsync(cookie);
    const user = await this.authService.findUser({ id: data.id });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      status: 'success',
      message: 'Register Success',
    };
  }
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findUser({ email: loginDto.email });

    if (!user || !(await verify(user.password, loginDto.password))) {
      throw new BadRequestException('Login Failed: Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    // Set the cookie with appropriate flags
    response.cookie('token', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    // Set the Authorization header
    response.setHeader('Authorization', `Bearer ${jwt}`);

    return {
      status: 'success',
      message: 'Login Success',
      token: jwt,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the token cookie
    response.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
  
    // Remove the Authorization header
    response.removeHeader('Authorization');
  
    return {
      status: 'success',
      message: 'Logout Success',
    };
  }


}
