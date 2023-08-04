import { Controller, Post, Body, UseGuards, ValidationPipe, UsePipes, Put, Param, Get } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { SetKeywordDto } from './dto/setKeyword.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('keyword')
export class KeywordController {
    constructor (private readonly keywordReplyService: KeywordService) { }

    @Post('set')
    @UsePipes(new ValidationPipe({ transform: true }))
    setKeyword (@Body() setKeywordDto: SetKeywordDto) {
        console.log(setKeywordDto);
        return this.keywordReplyService.setKeyword(setKeywordDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateKeyword (@Param('id') id: string, @Body() setKeywordDto: SetKeywordDto) {
        return this.keywordReplyService.updateKeyword(id, setKeywordDto);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    getAll () {
        return this.keywordReplyService.findAll();
    }

    //   @Post('/get-reply')
    //   getReply(@Body() setMessageDto: SetMessageDto) {
    //     const reply = this.keywordReplyService.getMessage(setMessageDto);
    //     return { reply };
    //   }
}
