import { Controller, Request, Post, UseGuards, Body, UsePipes, ValidationPipe, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login (@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create (@Body() createUserDto: CreateUserDto): Promise<any> {
        const user = await this.authService.signup(createUserDto);
        return user;
    }

    @Post('change/password')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe({ transform: true }))
    async changePassword (@Body() changePasswordDto: ChangePasswordDto, @Request() request): Promise<void> {
        const user = request.user;
        console.log("hello")
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        console.log(user)
        await this.authService.changePassword(user.email, changePasswordDto);
    }

    @Post('forgot/password')
    @UsePipes(new ValidationPipe({ transform: true }))
    async forgotPassword (@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const { email } = forgotPasswordDto;
        return await this.authService.sendForgotPasswordEmail(email);
    }

    @Post('reset/password/:token')
    @UsePipes(new ValidationPipe({ transform: true }))
    async resetPassword (
        @Param('token') token: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ): Promise<void> {
        await this.authService.resetPassword(token, resetPasswordDto.newPassword);
    }
}

