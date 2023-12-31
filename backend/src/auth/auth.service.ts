import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from '../user/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { compare, hash } from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async validateUser (email: string, pass: string): Promise<any> {
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .addSelect("user.password")
            .getOne();



        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login (loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log(user);
        const payload = { user };
        return {
            user: user,
            access_token: await this.jwtService.sign(payload),

        };
    }

    async signup (createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await hash(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async changePassword (email: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { oldPassword, newPassword } = changePasswordDto;
        const user = await this.validateUser(email, oldPassword);
        console.log(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // Update the user's password with the new one
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }

    async sendForgotPasswordEmail (email: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) {
            // Optionally, you can return a more generic error message here to avoid revealing the existence of the email in the system.
            throw new UnauthorizedException('User not found');
        }

        // Generate a unique reset token and save it in the user entity
        const resetToken = uuidv4();
        user.resetPasswordToken = resetToken;
        await this.userRepository.save(user);

        // Send the reset password email containing the reset link
        const resetLink = `https://dhoon.co/reset-password/${ resetToken }`;
        const emailSubject = 'Password Reset';
        const emailBody = `Click on the following link to reset your password: ${ resetLink }`;

        console.log(resetToken);
        return resetToken;
        // You need to implement the 'sendMail' method in your MailService to handle sending emails.
        // The 'sendMail' method should use a library or a service to send the email, like Nodemailer.
        // await this.mailService.sendMail(user.email, emailSubject, emailBody);
    }

    async resetPassword (token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ resetPasswordToken: token });

        if (!user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        // Update the user's password with the new one
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null; // Reset the reset password token
        await this.userRepository.save(user);
    }
}