import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateKeywordDto {
    @IsOptional()
    @IsNotEmpty()
    keyword: string;

    @IsOptional()
    @IsNotEmpty()
    reply: string;
}
