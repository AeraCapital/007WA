import { IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  status: boolean;
}
