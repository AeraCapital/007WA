import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateKeywordDto {
    keyword: string;

    @IsOptional()
    @IsNotEmpty()
    reply: string;
}
