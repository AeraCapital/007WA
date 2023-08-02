// src/keyword-reply/keyword-reply.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { SetKeywordDto } from './dto/setKeyword.dto';

@Injectable()
export class KeywordService {
    constructor (
        @InjectRepository(Keyword)
        private keywordReplyRepository: Repository<Keyword>,
    ) { }

    async setKeyword (setKeywordDto: SetKeywordDto) {
        const keywordReply = this.keywordReplyRepository.create(setKeywordDto);
        return await this.keywordReplyRepository.save(keywordReply);
    }

    async updateKeyword (id: string, setKeywordDto: SetKeywordDto) {
        const keywordReply = await this.keywordReplyRepository.findOneBy({ id: id });
        if (!keywordReply) {
            throw new NotFoundException(`Keyword with ID ${ id } not found`);
        }

        const updatedKeywordReply = this.keywordReplyRepository.merge(keywordReply, setKeywordDto);
        return this.keywordReplyRepository.save(updatedKeywordReply);
    }
}
