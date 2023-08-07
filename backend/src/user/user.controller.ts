import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UsePipes,
    Get,
    Request,
    UseGuards,
    Put,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateAgentDto } from './dto/createAgent.dto';


@Controller('user')
export class UserController {
    constructor (private userService: UserService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create (@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.create(createUserDto);
        return user;
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getMe (@Request() request) {
        const { id } = request.user;
        const user = await this.userService.findOne(id);
        return user;
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateMe (@Body() updateUserDto: UpdateUserDto, @Request() request): Promise<User> {
        const { id } = request.user;

        return this.userService.updateUser(id, updateUserDto);
    }


    @Post('agent')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async createAgent (@Body() createAgentDto: CreateAgentDto): Promise<User> {
        return this.userService.createAgent(createAgentDto);
    }

    @Put('agent/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async editAgent (@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }
    @Get('agents')
    @UseGuards(JwtAuthGuard)
    async getAgents (): Promise<User[]> {
        return this.userService.getAgents();
    }
}
