import { USER_ROLE } from "../entities/user.entity";


export class UpdateUserDto {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: USER_ROLE;
}
